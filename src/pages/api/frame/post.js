export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { untrustedData } = req.body;
  
  if (!untrustedData?.input?.text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  // The text will be automatically posted to Farcaster by the Frame
  // We just need to show a success message
  const frameMetadata = {
    "og:title": "Posted to Farcaster!",
    "og:description": "Your song recommendation has been shared!",
    "og:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame": "vNext",
    "fc:frame:image": "https://song-of-the-day-sepia.vercel.app/frame-preview.html",
    "fc:frame:button:1": "Take Quiz Again",
    "fc:frame:post_url": "https://song-of-the-day-sepia.vercel.app/api/frame"
  };

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Posted to Farcaster!</title>
        ${Object.entries(frameMetadata)
          .map(([key, value]) => `<meta property="${key}" content="${value}" />`)
          .join('\n')}
      </head>
      <body>
        <h1>Posted to Farcaster!</h1>
        <p>Your song recommendation has been shared with your followers!</p>
      </body>
    </html>
  `);
} 