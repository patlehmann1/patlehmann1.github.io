const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

const W = 1200;
const H = 630;

async function generate() {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // Background: deep navy
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0a0e1a");
  bg.addColorStop(0.5, "#0d1220");
  bg.addColorStop(1, "#080b14");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Warm amber glow behind photo
  const glow1 = ctx.createRadialGradient(215, 315, 0, 215, 315, 420);
  glow1.addColorStop(0, "rgba(194, 97, 35, 0.18)");
  glow1.addColorStop(1, "rgba(194, 97, 35, 0)");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, W, H);

  // Cool blue accent glow top-right
  const glow2 = ctx.createRadialGradient(1050, 180, 0, 1050, 180, 320);
  glow2.addColorStop(0, "rgba(56, 120, 220, 0.10)");
  glow2.addColorStop(1, "rgba(56, 120, 220, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  // Subtle horizontal scan-line texture
  for (let y = 0; y < H; y += 3) {
    ctx.fillStyle = "rgba(255,255,255,0.012)";
    ctx.fillRect(0, y, W, 1);
  }

  // Vertical divider with amber gradient fade
  const dividerX = 430;
  const divider = ctx.createLinearGradient(0, 60, 0, H - 60);
  divider.addColorStop(0, "rgba(194, 97, 35, 0)");
  divider.addColorStop(0.3, "rgba(194, 97, 35, 0.6)");
  divider.addColorStop(0.7, "rgba(194, 97, 35, 0.6)");
  divider.addColorStop(1, "rgba(194, 97, 35, 0)");
  ctx.strokeStyle = divider;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(dividerX, 60);
  ctx.lineTo(dividerX, H - 60);
  ctx.stroke();

  // --- Headshot: circular crop, centred in left panel ---
  const photoSize = 300;
  const photoX = (dividerX - photoSize) / 2;
  const photoY = (H - photoSize) / 2;
  const cx = photoX + photoSize / 2;
  const cy = photoY + photoSize / 2;
  const r = photoSize / 2;

  try {
    const img = await loadImage(
      path.join(__dirname, "../public/images/headshot-og.png")
    );

    // Outer amber ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(194, 97, 35, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Clip circle and draw photo — crop to square from centre
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const aspect = img.width / img.height;
    let drawW, drawH, drawX, drawY;
    if (aspect >= 1) {
      drawH = photoSize;
      drawW = photoSize * aspect;
      drawX = photoX - (drawW - photoSize) / 2;
      drawY = photoY;
    } else {
      drawW = photoSize;
      drawH = photoSize / aspect;
      drawX = photoX;
      drawY = photoY - (drawH - photoSize) / 2;
    }
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Subtle vignette inside circle
    const vignette = ctx.createRadialGradient(cx, cy, r * 0.55, cx, cy, r);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = vignette;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  } catch (e) {
    // Fallback placeholder
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#1a2035";
    ctx.fill();
    ctx.restore();
    console.warn("Could not load headshot:", e.message);
  }

  // --- Right panel text ---
  const textX = dividerX + 54;
  let textY = 148;

  // Domain label
  ctx.font = "500 17px monospace";
  ctx.fillStyle = "rgba(194, 97, 35, 0.85)";
  ctx.fillText("patricklehmann.io", textX, textY);
  textY += 60;

  // Name — large serif
  ctx.font = "bold 76px Georgia, serif";
  ctx.fillStyle = "#f0ece4";
  ctx.fillText("Patrick", textX, textY);
  textY += 82;
  ctx.fillText("Lehmann", textX, textY);
  textY += 52;

  // Amber underline
  const underlineGrad = ctx.createLinearGradient(textX, 0, textX + 280, 0);
  underlineGrad.addColorStop(0, "rgba(194, 97, 35, 0.9)");
  underlineGrad.addColorStop(1, "rgba(194, 97, 35, 0)");
  ctx.fillStyle = underlineGrad;
  ctx.fillRect(textX, textY, 280, 2);
  textY += 36;

  // Title
  ctx.font = "400 25px sans-serif";
  ctx.fillStyle = "rgba(240, 236, 228, 0.80)";
  ctx.fillText("Federal Software Engineer", textX, textY);
  textY += 34;

  // Division lines
  ctx.font = "400 19px sans-serif";
  ctx.fillStyle = "rgba(240, 236, 228, 0.45)";
  ctx.fillText("US Office of Personnel Management", textX, textY);
  textY += 28;
  ctx.fillText("Retirement Services Division", textX, textY);
  textY += 52;

  // Tech stack pills
  const tags = ["C#/.NET", "TypeScript", "React", "Go"];
  const pillH = 30;
  const pillPad = 14;
  let pillX = textX;

  ctx.font = "500 13px monospace";
  for (const tag of tags) {
    const tw = ctx.measureText(tag).width;
    const pillW = tw + pillPad * 2;

    ctx.save();
    ctx.beginPath();
    roundRect(ctx, pillX, textY - 20, pillW, pillH, 6);
    ctx.fillStyle = "rgba(194, 97, 35, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(194, 97, 35, 0.40)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = "rgba(194, 97, 35, 0.95)";
    ctx.fillText(tag, pillX + pillPad, textY + 3);

    pillX += pillW + 10;
  }

  // Bottom-right watermark
  ctx.font = "400 14px monospace";
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  const urlText = "patricklehmann.io";
  const urlW = ctx.measureText(urlText).width;
  ctx.fillText(urlText, W - urlW - 40, H - 28);

  // Write PNG
  const out = path.join(__dirname, "../public/og-image.png");
  fs.writeFileSync(out, canvas.toBuffer("image/png"));
  console.log("Generated og-image.png (" + W + "x" + H + ")");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

generate().catch((e) => {
  console.error(e);
  process.exit(1);
});
