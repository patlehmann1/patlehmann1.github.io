const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const fontDir = path.join(__dirname, "fonts");
registerFont(path.join(fontDir, "PressStart2P-Regular.ttf"), { family: "Press Start 2P" });
registerFont(path.join(fontDir, "PixelifySans.ttf"), { family: "Pixelify Sans" });
registerFont(path.join(fontDir, "JetBrainsMono.ttf"), { family: "JetBrains Mono" });

const W = 1200;
const H = 630;

const BG = "#f3f6f3";
const ACCENT = "#24a85b";
const ACCENT_DARK = "#156537";
const TEXT = "#24422e";
const MUTED = "#62846d";

const PHOTO_PIXELS = 48;
const PHOTO_SCALE = 6;
const POSTERIZE_STEP = 32;

async function generate() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(36, 66, 46, 0.06)";
  for (let x = 0; x < W; x += 24) ctx.fillRect(x, 0, 1, H);
  for (let y = 0; y < H; y += 24) ctx.fillRect(0, y, W, 1);

  const photoSize = PHOTO_PIXELS * PHOTO_SCALE;
  const photoX = 72;
  const photoY = (H - photoSize) / 2;

  ctx.fillStyle = ACCENT;
  ctx.fillRect(photoX + 12, photoY + 12, photoSize, photoSize);
  pixelBorder(ctx, photoX, photoY, photoSize, photoSize, 6, TEXT);

  try {
    const img = await loadImage(path.join(__dirname, "../public/images/headshot-og.png"));
    ctx.drawImage(pixelate(img), photoX, photoY, photoSize, photoSize);
  } catch (e) {
    ctx.fillStyle = "#ccd7cc";
    ctx.fillRect(photoX, photoY, photoSize, photoSize);
    console.warn("Could not load headshot:", e.message);
  }

  const textX = 456;
  let textY = 150;

  ctx.font = "20px 'JetBrains Mono'";
  ctx.fillStyle = ACCENT;
  ctx.fillText("> patricklehmann.io", textX, textY);
  textY += 100;

  ctx.font = "64px 'Press Start 2P'";
  shadowText(ctx, "Patrick", textX, textY);
  textY += 92;
  shadowText(ctx, "Lehmann", textX, textY);
  const cursorX = textX + ctx.measureText("Lehmann").width + 20;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(cursorX, textY - 60, 36, 64);
  textY += 76;

  ctx.font = "36px 'Pixelify Sans'";
  ctx.fillStyle = TEXT;
  ctx.fillText("Federal Software Engineer", textX, textY);
  textY += 40;

  ctx.font = "18px 'JetBrains Mono'";
  ctx.fillStyle = MUTED;
  ctx.fillText("US Office of Personnel Management", textX, textY);
  textY += 26;
  ctx.fillText("Retirement Services Division", textX, textY);
  textY += 52;

  ctx.font = "16px 'JetBrains Mono'";
  let tagX = textX + 4;
  for (const tag of ["C#/.NET", "TypeScript", "React", "Go"]) {
    const tagW = ctx.measureText(tag).width + 28;
    const tagH = 34;
    ctx.fillStyle = "rgba(36, 168, 91, 0.12)";
    ctx.fillRect(tagX, textY - 23, tagW, tagH);
    pixelBorder(ctx, tagX, textY - 23, tagW, tagH, 3, ACCENT);
    ctx.fillStyle = ACCENT;
    ctx.fillText(tag, tagX + 14, textY);
    tagX += tagW + 18;
  }

  ctx.fillStyle = "rgba(36, 66, 46, 0.05)";
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);

  const out = path.join(__dirname, "../public/og-image.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  console.log("Generated og-image.png (" + W + "x" + H + ")");
}

/**
 * Center-crops the photo to a square, shrinks it to a tiny grid, and posterizes the colors.
 * Drawing the result back at full size with smoothing off produces chunky pixel-art blocks.
 */
function pixelate(img) {
  const small = createCanvas(PHOTO_PIXELS, PHOTO_PIXELS);
  const sctx = small.getContext("2d");
  const side = Math.min(img.width, img.height);
  sctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, PHOTO_PIXELS, PHOTO_PIXELS);

  const data = sctx.getImageData(0, 0, PHOTO_PIXELS, PHOTO_PIXELS);
  for (let i = 0; i < data.data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      data.data[i + c] = Math.min(255, Math.round(data.data[i + c] / POSTERIZE_STEP) * POSTERIZE_STEP);
    }
  }
  sctx.putImageData(data, 0, 0);
  return small;
}

/**
 * Draws the four edges of a box but leaves the corners empty, giving NES-style stepped corners.
 */
function pixelBorder(ctx, x, y, w, h, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - size, w, size);
  ctx.fillRect(x, y + h, w, size);
  ctx.fillRect(x - size, y, size, h);
  ctx.fillRect(x + w, y, size, h);
}

function shadowText(ctx, text, x, y) {
  ctx.fillStyle = ACCENT_DARK;
  ctx.fillText(text, x + 6, y + 6);
  ctx.fillStyle = ACCENT;
  ctx.fillText(text, x, y);
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
