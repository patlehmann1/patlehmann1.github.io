const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#F5F5F5';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

ctx.fillStyle = '#000000';
ctx.font = 'bold 110px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

const nameY = HEIGHT / 2 - 40;
ctx.fillText('Patrick Lehmann', WIDTH / 2, nameY);

ctx.fillStyle = '#333333';
ctx.font = '45px sans-serif';
const subtitleY = HEIGHT / 2 + 70;
ctx.fillText('Full-Stack Software Engineer', WIDTH / 2, subtitleY);

ctx.fillStyle = '#C4651C';
ctx.fillRect(WIDTH / 2 - 100, HEIGHT / 2 + 120, 200, 3);

const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '../public/og-image.png');
fs.writeFileSync(outputPath, buffer);

console.log('✅ OG image generated successfully at public/og-image.png');
