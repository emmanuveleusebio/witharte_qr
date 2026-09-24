const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const TARGET_URL = process.env.DESTINATION_URL || 'https://share.google/gZUSXx8DAtgWuPtb5';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  // 1. Simulate Vercel Edge Redirect for /go, /r, and /link
  if (pathname === '/go' || pathname === '/r' || pathname === '/link') {
    console.log(`[Redirect Test] ${pathname} => ${TARGET_URL}`);
    res.writeHead(307, {
      'Location': TARGET_URL,
      'Cache-Control': 'no-cache'
    });
    res.end(`Redirecting to ${TARGET_URL}`);
    return;
  }

  // 2. Serve static dashboard files
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Local test server running on port ${PORT}!`);
  console.log(`📱 Main QR Dashboard:  http://localhost:${PORT}`);
  console.log(`⚡ Live Redirect Test:  http://localhost:${PORT}/go`);
  console.log(`🎯 Destination URL:     ${TARGET_URL}`);
  console.log('====================================================');
});
