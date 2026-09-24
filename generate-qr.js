const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://share.google/gZUSXx8DAtgWuPtb5';

async function generateQRCodes() {
  console.log(`Generating permanent QR codes for: ${TARGET_URL}`);

  // Options for high quality and durability (Error correction 'H' = 30% damage resistant)
  const options = {
    errorCorrectionLevel: 'H',
    type: 'png',
    quality: 1,
    margin: 2,
    color: {
      dark: '#111827', // Deep slate / near black
      light: '#ffffff' // Pure white
    },
    width: 2000
  };

  // 1. High-resolution PNG (2000x2000 px - ready for crisp printing on banners/flyers)
  const pngPath = path.join(__dirname, 'qr-direct-hd.png');
  await QRCode.toFile(pngPath, TARGET_URL, options);
  console.log(`✓ High-Res PNG generated at: ${pngPath}`);

  // 2. High-resolution standard PNG (800x800 px - web friendly)
  const pngWebPath = path.join(__dirname, 'qr-direct.png');
  await QRCode.toFile(pngWebPath, TARGET_URL, { ...options, width: 800 });
  console.log(`✓ Web-friendly PNG generated at: ${pngWebPath}`);

  // 3. Vector SVG (infinite resolution, perfect for vector design tools like Illustrator, Canva, Figma)
  const svgPath = path.join(__dirname, 'qr-direct.svg');
  const svgString = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#111827',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(svgPath, svgString);
  console.log(`✓ Infinite Vector SVG generated at: ${svgPath}`);

  console.log('All QR codes generated successfully!');
}

generateQRCodes().catch(err => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
