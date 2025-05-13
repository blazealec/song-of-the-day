export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { untrustedData } = req.body;
  
  // If this is the first interaction, show the first question
  if (!untrustedData?.state) {
    const frameMetadata = {
      "og:title": "Song of the Day - Question 1",
      "og:description": "What's your current mood?",
      "og:image": "https://song-of-the-day-sepia.vercel.app/frame-mood.html",
      "fc:frame": "vNext",
      "fc:frame:image": "https://song-of-the-day-sepia.vercel.app/frame-mood.html",
      "fc:frame:button:1": "Happy",
      "fc:frame:button:2": "Chill",
      "fc:frame:button:3": "Energetic",
      "fc:frame:button:4": "Reflective",
      "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame/quiz",
      "fc:frame:state": "mood"
    };

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Song of the Day - Question 1</title>
          ${Object.entries(frameMetadata)
            .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
            .join('\n')}
        </head>
        <body>
          <h1>What's your current mood?</h1>
        </body>
      </html>
    `);
  }

  // Handle the mood selection and show the next question
  if (untrustedData.state === 'mood') {
    const mood = untrustedData.buttonIndex;
    const frameMetadata = {
      "og:title": "Song of the Day - Question 2",
      "og:description": "What genre do you prefer?",
      "og:image": "https://song-of-the-day-sepia.vercel.app/frame-genre.html",
      "fc:frame": "vNext",
      "fc:frame:image": "https://song-of-the-day-sepia.vercel.app/frame-genre.html",
      "fc:frame:button:1": "Pop",
      "fc:frame:button:2": "Rock",
      "fc:frame:button:3": "Hip Hop",
      "fc:frame:button:4": "Electronic",
      "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame/quiz",
      "fc:frame:state": `genre_${mood}`
    };

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Song of the Day - Question 2</title>
          ${Object.entries(frameMetadata)
            .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
            .join('\n')}
        </head>
        <body>
          <h1>What genre do you prefer?</h1>
        </body>
      </html>
    `);
  }

  // Handle the final selection and show the recommendation
  if (untrustedData.state.startsWith('genre_')) {
    const [_, mood] = untrustedData.state.split('_');
    const genre = untrustedData.buttonIndex;
    
    // Get recommendation based on mood and genre
    const recommendation = await getRecommendation(mood, genre);
    
    const frameMetadata = {
      "og:title": "Your Song Recommendation",
      "og:description": `${recommendation.title} by ${recommendation.artist}`,
      "og:image": recommendation.coverUrl,
      "fc:frame": "vNext",
      "fc:frame:image": recommendation.coverUrl,
      "fc:frame:button:1": "Take Quiz Again",
      "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame"
    };

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Your Song Recommendation</title>
          ${Object.entries(frameMetadata)
            .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
            .join('\n')}
        </head>
        <body>
          <h1>Your Song Recommendation</h1>
          <p>${recommendation.title} by ${recommendation.artist}</p>
        </body>
      </html>
    `);
  }
}

// Helper function to get recommendation based on mood and genre
async function getRecommendation(mood, genre) {
  // Map mood and genre indices to actual values
  const moods = ['happy', 'chill', 'energetic', 'reflective'];
  const genres = ['pop', 'rock', 'hip-hop', 'electronic'];
  
  const selectedMood = moods[mood - 1];
  const selectedGenre = genres[genre - 1];
  
  // Call your existing recommendation service
  const recommendation = await getQuizRecommendation({
    mood: selectedMood,
    genre: selectedGenre
  });
  
  return recommendation;
} 