const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const TARGET_URL = process.env.DESTINATION_URL || 'https://www.google.com/search?q=WITHARTE+Gallery';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
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

  // Helper to serve file
  function serveFile(targetFile) {
    fs.stat(targetFile, (err, stats) => {
      if (!err && stats.isFile()) {
        const ext = path.extname(targetFile).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(targetFile).pipe(res);
        return;
      }

      if (!err && stats.isDirectory()) {
        const indexInDir = path.join(targetFile, 'index.html');
        return serveFile(indexInDir);
      }

      // Try looking in public/ directory
      const publicPath = path.join(__dirname, 'public', pathname);
      fs.stat(publicPath, (errPublic, statsPublic) => {
        if (!errPublic && statsPublic.isFile()) {
          const ext = path.extname(publicPath).toLowerCase();
          const contentType = MIME_TYPES[ext] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': contentType });
          fs.createReadStream(publicPath).pipe(res);
          return;
        }

        if (!errPublic && statsPublic.isDirectory()) {
          const publicIndex = path.join(publicPath, 'index.html');
          return serveFile(publicIndex);
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      });
    });
  }

  const initialPath = pathname === '/' ? path.join(__dirname, 'index.html') : path.join(__dirname, pathname);
  serveFile(initialPath);
});

function startServer(port) {
  server.listen(port, () => {
    console.log('====================================================');
    console.log(`🚀 Local test server running on port ${port}!`);
    console.log(`📱 Main QR Dashboard:    http://localhost:${port}`);
    console.log(`📰 Best News Apps Blog:  http://localhost:${port}/best-news-apps-india-2026`);
    console.log(`⚡ Live Redirect Test:    http://localhost:${port}/go`);
    console.log('====================================================');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
