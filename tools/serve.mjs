#!/usr/bin/env node
/**
 * 로컬 확인용 정적 서버 (의존성 없음, Node 18+).
 *   npm run serve            → http://localhost:8080  (같은 와이파이의 폰에서는 http://<PC IP>:8080)
 * python http.server 와 달리 연결을 재사용(keep-alive)하고 캐시 헤더를 붙여서, 실제 배포(CloudFront)에 더 가깝게 동작한다.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import zlib from 'node:zlib';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || process.env.PORT || 8080);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
const compressible = new Set(['.html', '.css', '.js', '.json', '.svg']);
// 스테이션 찾기 지도용 API. 배포에서는 CloudFront 가 같은 경로를 API 서버로 전달한다 (deploy/README-DEPLOY.md).
const API_ORIGIN = process.env.API_ORIGIN || 'https://api.ev-tago.com';
const API_PATH = '/api/w/map/stations';

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === API_PATH) {
    fetch(API_ORIGIN + API_PATH, { headers: { Accept: 'application/json' } })
      .then(async (upstream) => {
        res.writeHead(upstream.status, { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' });
        res.end(Buffer.from(await upstream.arrayBuffer()));
      })
      .catch(() => { res.writeHead(502).end(); });
    return;
  }
  let file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }).end(); return; }
    file = path.join(file, 'index.html');
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(path.join(root, '404.html')).on('error', () => res.end('Not found')).pipe(res);
      return;
    }
    const ext = path.extname(file);
    const hashed = /\.[0-9a-f]{10}\.(css|js)$/.test(file);
    const headers = {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : hashed || ext === '.woff2' ? 'public, max-age=31536000, immutable' : 'public, max-age=2592000',
      'Last-Modified': st.mtime.toUTCString(),
    };
    if (req.headers['if-modified-since'] && new Date(req.headers['if-modified-since']) >= new Date(st.mtime.toUTCString())) { res.writeHead(304, headers).end(); return; }
    if (compressible.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      res.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
      fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, { ...headers, 'Content-Length': st.size });
      fs.createReadStream(file).pipe(res);
    }
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`\n  http://localhost:${port}`);
  for (const list of Object.values(os.networkInterfaces())) for (const i of list || []) if (i.family === 'IPv4' && !i.internal) console.log(`  http://${i.address}:${port}   ← 폰(같은 와이파이)에서`);
  console.log();
});
