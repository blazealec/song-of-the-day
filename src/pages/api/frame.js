export default function handler(req, res) {
  // Frame metadata
  const frameMetadata = {
    "og:title": "Song of the Day - Personality Quiz",
    "og:description": "Take a quick personality quiz to discover your perfect song!",
    "og:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame": "vNext",
    "fc:frame:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame:button:1": "Start Quiz",
    "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame/quiz"
  };

  // Set headers
  res.setHeader('Content-Type', 'text/html');
  
  // Return the HTML with meta tags
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Song of the Day - Personality Quiz</title>
        ${Object.entries(frameMetadata)
          .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
          .join('\n')}
      </head>
      <body>
        <h1>Song of the Day - Personality Quiz</h1>
        <p>Take a quick personality quiz to discover your perfect song!</p>
      </body>
    </html>
  `);
} 