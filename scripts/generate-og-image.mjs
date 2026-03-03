#!/usr/bin/env node
/**
 * Generates /public/og-image.png — a 1200×630 brand image used for social sharing.
 * No external dependencies; uses only Node.js built-ins (zlib).
 *
 * Colors: Tailwind blue-900 (#1e3a8a) → blue-700 (#1d4ed8) diagonal gradient
 *         with a subtle lighter horizontal band in the lower third.
 */

import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og-image.png');

const W = 1200;
const H = 630;

// --- CRC32 ---------------------------------------------------------------
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[i] = c;
}
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// --- PNG chunk builder ---------------------------------------------------
function makeChunk(type, data) {
  const lenBuf = Buffer.allocUnsafe(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcVal = Buffer.allocUnsafe(4);
  crcVal.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcVal]);
}

// --- Pixel generator -----------------------------------------------------
// Background: diagonal blue gradient (blue-900 top-left → blue-700 bottom-right)
// Lower band: slightly lighter blue accent strip
function pixel(x, y) {
  const diagT = (x / W + y / H) / 2;           // 0 → 1 diagonal
  const bandT = Math.max(0, (y / H - 0.65) / 0.15); // accent near bottom

  // Base gradient: blue-900 (#1e3a8a) to blue-700 (#1d4ed8)
  let r = Math.round(30 + diagT * (29 - 30));
  let g = Math.round(58 + diagT * (78 - 58));
  let b = Math.round(138 + diagT * (216 - 138));

  // Subtle lighter band at bottom 15%
  r = Math.round(r + bandT * 15);
  g = Math.round(g + bandT * 20);
  b = Math.round(b + bandT * 30);

  return [Math.min(255, r), Math.min(255, g), Math.min(255, b)];
}

// --- Build raw scanline data ---------------------------------------------
const raw = Buffer.allocUnsafe(H * (W * 3 + 1));
let offset = 0;
for (let y = 0; y < H; y++) {
  raw[offset++] = 0; // filter type: None
  for (let x = 0; x < W; x++) {
    const [r, g, bl] = pixel(x, y);
    raw[offset++] = r;
    raw[offset++] = g;
    raw[offset++] = bl;
  }
}

// --- Assemble PNG --------------------------------------------------------
const ihdrData = Buffer.allocUnsafe(13);
ihdrData.writeUInt32BE(W, 0);
ihdrData.writeUInt32BE(H, 4);
ihdrData[8] = 8;  // bit depth
ihdrData[9] = 2;  // color type: RGB
ihdrData[10] = 0; // deflate
ihdrData[11] = 0; // adaptive filter
ihdrData[12] = 0; // no interlace

const compressed = deflateSync(raw, { level: 6 });

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
  makeChunk('IHDR', ihdrData),
  makeChunk('IDAT', compressed),
  makeChunk('IEND', Buffer.alloc(0)),
]);

writeFileSync(OUT, png);
console.log(`✓ public/og-image.png created (${(png.length / 1024).toFixed(1)} KB)`);
