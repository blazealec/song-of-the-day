export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { untrustedData } = req.body;
  
  if (!untrustedData?.state?.startsWith('share_')) {
    return res.status(400).json({ error: 'Invalid state' });
  }

  const [_, mood, genre] = untrustedData.state.split('_');
  const recommendation = await getRecommendation(mood, genre);

  // Create a shareable message
  const shareMessage = `🎵 My Song of the Day: "${recommendation.title}" by ${recommendation.artist}\n\n` +
    `Mood: ${moods[mood - 1]}\n` +
    `Genre: ${genres[genre - 1]}\n\n` +
    `Take the quiz: https://song-of-the-day-sepia.vercel.app/api/frame`;

  // If the user clicked "Share to Farcaster"
  if (untrustedData.buttonIndex === 1) {
    const frameMetadata = {
      "og:title": "Share Your Song",
      "og:description": "Share your song recommendation on Farcaster",
      "og:image": recommendation.coverUrl,
      "fc:frame": "vNext",
      "fc:frame:image": recommendation.coverUrl,
      "fc:frame:input:text": shareMessage,
      "fc:frame:button:1": "Post to Farcaster",
      "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame/post"
    };

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Share Your Song</title>
          ${Object.entries(frameMetadata)
            .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
            .join('\n')}
        </head>
        <body>
          <h1>Share Your Song</h1>
          <p>Click the button below to share your song recommendation on Farcaster!</p>
        </body>
      </html>
    `);
  }

  // If the user clicked "Take Quiz Again"
  if (untrustedData.buttonIndex === 2) {
    res.redirect(307, '/api/frame');
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