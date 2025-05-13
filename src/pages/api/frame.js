export default function handler(req, res) {
  // Frame metadata
  const frameMetadata = {
    "og:title": "Song of the Day - Personality Quiz",
    "og:description": "Take a quick personality quiz to discover your perfect song!",
    "og:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame": "vNext",
    "fc:frame:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame:button:1": "Start Quiz",
    "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame/quiz",
    "fc:frame:aspect_ratio": "1.91:1",
    "fc:frame:input:text": "Enter your name (optional)"
  };

  // Set headers
  res.setHeader('Content-Type', 'text/html');
  
  // Return the HTML with meta tags and Farcaster SDK
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Song of the Day - Personality Quiz</title>
        ${Object.entries(frameMetadata)
          .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
          .join('\n')}
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/@farcaster/frame-sdk@latest/dist/index.js"></script>
      </head>
      <body>
        <div id="app">
          <h1>Song of the Day - Personality Quiz</h1>
          <p>Take a quick personality quiz to discover your perfect song!</p>
        </div>
        <script>
          // Initialize Farcaster Frame SDK
          const { sdk } = window.FarcasterFrameSDK;
          
          // Call ready when the interface is loaded
          sdk.actions.ready();
        </script>
      </body>
    </html>
  `);
} 