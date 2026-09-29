import logoUrl from "@/assets/rwb-circle-logo.webp";

export const CERT_WIDTH = 1600;
export const CERT_HEIGHT = 1130;

export type CertificateData = {
  name: string;
  city: string;
  certificateId: string;
  issuedAt: Date;
  siteHost: string;
};

// The Urban Farmer logo palette on warm parchment.
const GOLD_LIGHT = "#fde68a";
const GOLD = "#f6b93b";
const GOLD_DEEP = "#c27a0e";
const FOREST = "#173d0a";
const GREEN = "#2c5e14";
const LEAF = "#4d8a1c";
const SOIL = "#7a3612";
const BARK = "#4a1d06";
const INK = "#2a2118";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

type Ctx = CanvasRenderingContext2D;

let logoPromise: Promise<HTMLImageElement> | null = null;

export function loadCertificateLogo() {
  logoPromise ??= new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      logoPromise = null;
      reject(new Error("Certificate logo failed to load"));
    };
    img.src = logoUrl;
  });
  return logoPromise;
}

export function createCertificateId() {
  const stamp = Date.now().toString(36).slice(-5);
  const rand = Math.floor(Math.random() * 36 ** 3)
    .toString(36)
    .padStart(3, "0");
  return `RWB-UF-${stamp}${rand}`.toUpperCase();
}

export function formatIssueDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function certificateFileName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `urban-farmer-certificate${slug ? `-${slug}` : ""}.png`;
}

export function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not export certificate"))),
      "image/png",
    ),
  );
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function drawCertificate(
  ctx: Ctx,
  data: CertificateData,
  { logo, preview }: { logo: HTMLImageElement | null; preview: boolean },
) {
  const W = CERT_WIDTH;
  const H = CERT_HEIGHT;
  const cx = W / 2;

  ctx.save();
  ctx.clearRect(0, 0, W, H);
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Background
  const bg = ctx.createRadialGradient(cx, H * 0.38, 60, cx, H * 0.5, W * 0.7);
  bg.addColorStop(0, "#fffcf4");
  bg.addColorStop(0.55, "#f8f2e6");
  bg.addColorStop(1, "#e9dcc0");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const logoY = 168;
  const logoR = 76;
  const glow = ctx.createRadialGradient(cx, logoY, 0, cx, logoY, 300);
  glow.addColorStop(0, "rgba(246,185,59,0.3)");
  glow.addColorStop(1, "rgba(246,185,59,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(cx - 300, 0, 600, logoY + 300);

  // Guilloche band, like security print on share certificates
  ctx.save();
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 1;
  for (let k = 0; k < 14; k++) {
    ctx.globalAlpha = 0.035 + (k % 3) * 0.012;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 10) {
      const y = H * 0.84 + Math.sin(x / 150 + k * 0.5) * (18 + k * 6) - k * 10;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Frames
  ctx.strokeStyle = goldGradient(ctx, 0, 0, W, H);
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, W - 68, H - 68);
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.55;
  ctx.strokeRect(50, 50, W - 100, H - 100);
  ctx.globalAlpha = 1;
  ctx.strokeStyle = GREEN;
  ctx.fillStyle = GREEN;
  corner(ctx, 50, 50, 0);
  corner(ctx, W - 50, 50, Math.PI / 2);
  corner(ctx, W - 50, H - 50, Math.PI);
  corner(ctx, 50, H - 50, -Math.PI / 2);

  // Logo medallion
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, logoY, logoR, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "rgba(23,61,10,0.3)";
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.shadowColor = "transparent";
  if (logo) {
    ctx.clip();
    ctx.drawImage(logo, cx - logoR, logoY - logoR, logoR * 2, logoR * 2);
  } else {
    ctx.fillStyle = "#991b1b";
    ctx.font = `700 44px ${SERIF}`;
    ctx.fillText("RWB", cx, logoY + 15);
  }
  ctx.restore();
  ctx.strokeStyle = goldGradient(ctx, cx - logoR, logoY - logoR, cx + logoR, logoY + logoR);
  ctx.lineWidth = 4;
  circle(ctx, cx, logoY, logoR + 4);
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;
  circle(ctx, cx, logoY, logoR + 14);
  ctx.globalAlpha = 1;

  // Eyebrow
  ctx.fillStyle = SOIL;
  ctx.font = `600 22px ${SANS}`;
  const eyebrowWidth = spacedText(ctx, "CERTIFICATE OF WELCOME", cx, 300, 9);
  ctx.strokeStyle = SOIL;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.75;
  for (const dir of [-1, 1]) {
    const inner = cx + dir * (eyebrowWidth / 2 + 26);
    line(ctx, inner, 292, inner + dir * 90, 292);
    diamond(ctx, cx + dir * (eyebrowWidth / 2 + 14), 292, 4);
  }
  ctx.globalAlpha = 1;

  // Title
  ctx.font = `700 108px ${SERIF}`;
  const titleFill = ctx.createLinearGradient(0, 320, 0, 405);
  titleFill.addColorStop(0, LEAF);
  titleFill.addColorStop(0.6, GREEN);
  titleFill.addColorStop(1, FOREST);
  ctx.fillStyle = titleFill;
  ctx.shadowColor = "rgba(246,185,59,0.45)";
  ctx.shadowBlur = 24;
  ctx.fillText("The Urban Farmer", cx, 402);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;

  ctx.font = `italic 30px ${SERIF}`;
  ctx.fillStyle = "rgba(42,33,24,0.7)";
  ctx.fillText("This is to proudly certify that", cx, 472);

  // Recipient
  const name = data.name.trim();
  const displayName = name || (preview ? "Your Name" : "");
  fitFont(ctx, displayName, "italic 700", SERIF, 92, 44, 1120);
  ctx.fillStyle = name ? BARK : "rgba(74,29,6,0.3)";
  ctx.fillText(displayName, cx, 574);

  const underline = ctx.createLinearGradient(cx - 440, 0, cx + 440, 0);
  underline.addColorStop(0, "rgba(194,122,14,0)");
  underline.addColorStop(0.5, GOLD_DEEP);
  underline.addColorStop(1, "rgba(194,122,14,0)");
  ctx.strokeStyle = underline;
  ctx.lineWidth = 2;
  line(ctx, cx - 440, 608, cx + 440, 608);
  ctx.fillStyle = GREEN;
  diamond(ctx, cx, 608, 6);

  const city = data.city.trim();
  if (city) {
    ctx.font = `600 18px ${SANS}`;
    ctx.fillStyle = "rgba(122,54,18,0.75)";
    spacedText(ctx, city.toUpperCase(), cx, 650, 6);
  }

  ctx.font = `28px ${SERIF}`;
  ctx.fillStyle = "rgba(42,33,24,0.82)";
  const body =
    "has joined the revolutionary journey of becoming an Urban Farmer with Redwood Biotech — because farming is no longer restricted to rurals.";
  wrapLines(ctx, body, 1040).forEach((text, i) => ctx.fillText(text, cx, 714 + i * 44));

  // Details + seal
  detailBlock(ctx, 330, 905, formatIssueDate(data.issuedAt), "DATE OF ISSUE");
  detailBlock(ctx, W - 330, 905, data.certificateId, "CERTIFICATE NO.");
  seal(ctx, cx, 898, String(data.issuedAt.getFullYear()));

  // Footer
  ctx.font = `600 13px ${SANS}`;
  ctx.fillStyle = "rgba(44,94,20,0.8)";
  spacedText(ctx, "INNOVATIVE SCIENCE · WEALTHIER TOMORROW", cx, 1030, 5);
  if (data.siteHost) {
    ctx.font = `16px ${SANS}`;
    ctx.fillStyle = "rgba(42,33,24,0.55)";
    ctx.fillText(`Become one too at ${data.siteHost}/urban-farmer`, cx, 1058);
  }

  if (preview) {
    ctx.save();
    ctx.translate(cx, H / 2);
    ctx.rotate(-Math.PI / 9);
    ctx.font = `800 150px ${SANS}`;
    ctx.fillStyle = "rgba(44,94,20,0.06)";
    ctx.fillText("PREVIEW", 0, 50);
    ctx.restore();
  }

  ctx.restore();
}

function goldGradient(ctx: Ctx, x0: number, y0: number, x1: number, y1: number) {
  const g = ctx.createLinearGradient(x0, y0, x1, y1);
  g.addColorStop(0, GOLD_DEEP);
  g.addColorStop(0.3, GOLD_LIGHT);
  g.addColorStop(0.55, GOLD);
  g.addColorStop(0.8, GOLD_LIGHT);
  g.addColorStop(1, GOLD_DEEP);
  return g;
}

function line(ctx: Ctx, x0: number, y0: number, x1: number, y1: number) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function circle(ctx: Ctx, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
}

function diamond(ctx: Ctx, x: number, y: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r, y);
  ctx.closePath();
  ctx.fill();
}

// Canvas letterSpacing isn't supported everywhere, so glyphs are placed one by one.
function spacedText(ctx: Ctx, text: string, x: number, y: number, spacing: number) {
  const chars = Array.from(text);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  const align = ctx.textAlign;
  ctx.textAlign = "left";
  let cursor = x - total / 2;
  chars.forEach((c, i) => {
    ctx.fillText(c, cursor, y);
    cursor += widths[i] + spacing;
  });
  ctx.textAlign = align;
  return total;
}

function wrapLines(ctx: Ctx, text: string, maxWidth: number) {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(candidate).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function fitFont(
  ctx: Ctx,
  text: string,
  style: string,
  family: string,
  max: number,
  min: number,
  maxWidth: number,
) {
  let size = max;
  ctx.font = `${style} ${size}px ${family}`;
  while (size > min && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${style} ${size}px ${family}`;
  }
}

function corner(ctx: Ctx, x: number, y: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 110);
  ctx.lineTo(0, 0);
  ctx.lineTo(110, 0);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(18, 72);
  ctx.lineTo(18, 18);
  ctx.lineTo(72, 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 46, 0, Math.PI / 2);
  ctx.stroke();
  diamond(ctx, 18, 18, 6);
  ctx.restore();
}

function detailBlock(ctx: Ctx, x: number, y: number, value: string, label: string) {
  ctx.fillStyle = INK;
  ctx.font = `26px ${SERIF}`;
  ctx.fillText(value, x, y);
  ctx.strokeStyle = GOLD_DEEP;
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.7;
  line(ctx, x - 150, y + 22, x + 150, y + 22);
  ctx.globalAlpha = 1;
  ctx.fillStyle = GREEN;
  ctx.font = `600 14px ${SANS}`;
  spacedText(ctx, label, x, y + 52, 4);
}

function sprout(ctx: Ctx, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 22);
  ctx.quadraticCurveTo(2, 4, 0, -16);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.bezierCurveTo(-6, -14, -26, -18, -32, -6);
  ctx.bezierCurveTo(-24, 4, -8, 6, 0, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.bezierCurveTo(6, -26, 28, -30, 34, -16);
  ctx.bezierCurveTo(26, -4, 8, -3, 0, -8);
  ctx.fill();
  ctx.restore();
}

function seal(ctx: Ctx, x: number, y: number, year: string) {
  const R = 90;
  ctx.save();

  ctx.beginPath();
  const points = 96;
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = i % 2 === 0 ? R : R - 7;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = goldGradient(ctx, x - R, y - R, x + R, y + R);
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.beginPath();
  ctx.arc(x, y, R - 16, 0, Math.PI * 2);
  ctx.fillStyle = FOREST;
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  circle(ctx, x, y, R - 22);
  ctx.globalAlpha = 0.5;
  circle(ctx, x, y, R - 44);
  ctx.globalAlpha = 1;

  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `700 12px ${SANS}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const chars = Array.from("URBAN FARMER • REDWOOD BIOTECH • ");
  chars.forEach((c, i) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((i / chars.length) * Math.PI * 2);
    ctx.fillText(c, 0, -(R - 33));
    ctx.restore();
  });

  ctx.fillStyle = GOLD;
  ctx.strokeStyle = GOLD;
  sprout(ctx, x, y - 8, 0.85);
  ctx.font = `700 13px ${SANS}`;
  ctx.fillStyle = GOLD_LIGHT;
  ctx.fillText(year, x, y + 28);

  ctx.restore();
}
