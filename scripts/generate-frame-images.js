const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

function createFrameImage(text, outputPath) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split text into multiple lines if needed
  const words = text.split(' ');
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < WIDTH - 100) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw text
  const lineHeight = 60;
  const totalHeight = lines.length * lineHeight;
  const startY = (HEIGHT - totalHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, WIDTH / 2, startY + i * lineHeight);
  });

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate images
createFrameImage('Song of the Day - Take the Quiz!', path.join(publicDir, 'frame-preview.png'));
createFrameImage('What\'s your current mood?', path.join(publicDir, 'frame-mood.png'));
createFrameImage('What genre do you prefer?', path.join(publicDir, 'frame-genre.png')); 