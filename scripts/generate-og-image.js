const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");

const fontDir = path.join(__dirname, "fonts");
registerFont(path.join(fontDir, "PressStart2P-Regular.ttf"), { family: "Press Start 2P" });
registerFont(path.join(fontDir, "PixelifySans.ttf"), { family: "Pixelify Sans" });
registerFont(path.join(fontDir, "JetBrainsMono.ttf"), { family: "JetBrains Mono" });

const W = 1200;
const H = 630;

const BG = "#110a1f";
const GRID = "rgba(255, 51, 187, 0.08)";
const SCANLINE = "rgba(0, 0, 0, 0.18)";
const ACCENT = "#ff33bb";
const ACCENT_DARK = "#6a2a99";
const TEXT = "#efe8ef";
const MUTED = "#ab94b8";
const TAG = "#00ffff";
const TAG_FILL = "rgba(0, 255, 255, 0.1)";

const PHOTO_PIXELS = 48;
const PHOTO_SCALE = 6;
const POSTERIZE_STEP = 32;

const POST_TITLE_MAX_LINES = 3;
const POST_TITLE_SIZES = [68, 60, 54, 48, 44];
const POST_MARGIN = 72;

async function generate() {
  let headshot = null;
  try {
    headshot = pixelate(await loadImage(path.join(__dirname, "../public/images/headshot-og.png")));
  } catch (e) {
    console.warn("Could not load headshot:", e.message);
  }

  generateSite(headshot);

  const articles = JSON.parse(fs.readFileSync(path.join(__dirname, "../src/content/blog/articles.json"), "utf8"));
  const outDir = path.join(__dirname, "../public/og");
  fs.mkdirSync(outDir, { recursive: true });
  for (const article of articles) {
    fs.writeFileSync(path.join(outDir, `${article.slug}.png`), drawPost(article, headshot).toBuffer("image/png"));
  }
  console.log(`Generated ${articles.length} post images in public/og/`);
}

function generateSite(headshot) {
  const { canvas, ctx } = createBackground();

  const photoSize = PHOTO_PIXELS * PHOTO_SCALE;
  const photoX = 72;
  const photoY = (H - photoSize) / 2;
  drawPhoto(ctx, headshot, photoX, photoY, photoSize, 12, 6);

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
  drawTags(ctx, ["C#/.NET", "TypeScript", "React", "Go"], textX + 4, textY);

  drawScanlines(ctx);

  const out = path.join(__dirname, "../public/og-image.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  console.log("Generated og-image.png (" + W + "x" + H + ")");
}

function drawPost(article, headshot) {
  const { canvas, ctx } = createBackground();
  const maxWidth = W - POST_MARGIN * 2;

  ctx.font = "22px 'JetBrains Mono'";
  ctx.fillStyle = ACCENT;
  ctx.fillText("> patricklehmann.io/blog", POST_MARGIN, 96);

  const { size, lines } = fitTitle(ctx, article.title, maxWidth);
  const lineHeight = Math.round(size * 1.2);
  const titleTop = 130;
  const titleBottom = 370;
  let y = titleTop + (titleBottom - titleTop - lineHeight * lines.length) / 2 + size;
  ctx.font = `${size}px 'Pixelify Sans'`;
  for (const line of lines) {
    shadowText(ctx, line, POST_MARGIN, y, 4);
    y += lineHeight;
  }

  ctx.font = "16px 'JetBrains Mono'";
  drawTags(ctx, article.tags.slice(0, 3), POST_MARGIN + 4, 418);

  const photoSize = 96;
  const photoY = H - 56 - photoSize;
  drawPhoto(ctx, headshot, POST_MARGIN, photoY, photoSize, 6, 4);

  const metaX = POST_MARGIN + photoSize + 32;
  ctx.font = "22px 'Press Start 2P'";
  ctx.fillStyle = TEXT;
  ctx.fillText("Patrick Lehmann", metaX, photoY + 40);

  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
  ctx.font = "18px 'JetBrains Mono'";
  ctx.fillStyle = MUTED;
  ctx.fillText(`${date}  ·  ${article.readingTime} min read`, metaX, photoY + 80);

  drawScanlines(ctx);
  return canvas;
}

/**
 * Picks the largest title size that wraps into POST_TITLE_MAX_LINES, so short titles
 * stay big and the longest ones still fit. Falls back to the smallest size if nothing fits.
 */
function fitTitle(ctx, title, maxWidth) {
  for (const size of POST_TITLE_SIZES) {
    ctx.font = `${size}px 'Pixelify Sans'`;
    const lines = wrap(ctx, title, maxWidth);
    if (lines.length <= POST_TITLE_MAX_LINES) return { size, lines };
  }
  const size = POST_TITLE_SIZES[POST_TITLE_SIZES.length - 1];
  ctx.font = `${size}px 'Pixelify Sans'`;
  return { size, lines: wrap(ctx, title, maxWidth) };
}

function wrap(ctx, text, maxWidth) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  lines.push(line);
  return lines;
}

function createBackground() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = GRID;
  for (let x = 0; x < W; x += 24) ctx.fillRect(x, 0, 1, H);
  for (let y = 0; y < H; y += 24) ctx.fillRect(0, y, W, 1);

  return { canvas, ctx };
}

function drawScanlines(ctx) {
  ctx.fillStyle = SCANLINE;
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
}

function drawPhoto(ctx, headshot, x, y, size, shadowOffset, borderSize) {
  ctx.fillStyle = ACCENT;
  ctx.fillRect(x + shadowOffset, y + shadowOffset, size, size);
  pixelBorder(ctx, x, y, size, size, borderSize, TEXT);

  if (headshot) {
    ctx.drawImage(headshot, x, y, size, size);
  } else {
    ctx.fillStyle = MUTED;
    ctx.fillRect(x, y, size, size);
  }
}

function drawTags(ctx, tags, x, y) {
  for (const tag of tags) {
    const tagW = ctx.measureText(tag).width + 28;
    const tagH = 34;
    ctx.fillStyle = TAG_FILL;
    ctx.fillRect(x, y - 23, tagW, tagH);
    pixelBorder(ctx, x, y - 23, tagW, tagH, 3, TAG);
    ctx.fillStyle = TAG;
    ctx.fillText(tag, x + 14, y);
    x += tagW + 18;
  }
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

function shadowText(ctx, text, x, y, offset = 6) {
  ctx.fillStyle = ACCENT_DARK;
  ctx.fillText(text, x + offset, y + offset);
  ctx.fillStyle = ACCENT;
  ctx.fillText(text, x, y);
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
