/**
 * CampusConnect – server.js
 * Single entry point. Serves the `public/` folder as a static site.
 * Usage:  node server.js
 *   or:   npm start
 */

'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT    = process.env.PORT || 3000;
const PUBLIC  = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // Strip query string, decode URI
  let urlPath = req.url.split('?')[0];
  try { urlPath = decodeURIComponent(urlPath); } catch (_) {}

  // Default to index.html
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  const filePath = path.join(PUBLIC, urlPath);

  // Security: prevent path traversal outside public/
  if (!filePath.startsWith(PUBLIC)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try serving 404 page, or plain text
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 – Page not found');
      }
      res.writeHead(500);
      return res.end('Internal Server Error');
    }

    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`CampusConnect running at http://localhost:${PORT}`);
});
