#!/usr/bin/env node
/**
 * 정적 사이트 빌드: site/ → dist/
 *
 *  - 페이지별로 CSS(여러 개) / defer JS(여러 개)를 순서 그대로 하나로 묶는다. (요청 수 감소, 캐스케이드/실행 순서는 동일)
 *  - 묶음 파일명에 내용 해시를 붙인다. → 영구 캐시(immutable) 가능, ?v=숫자 수동 관리 불필요
 *  - 폰트 CSS도 해시 파일명으로, 첫 화면에 쓰는 폰트는 preload, 히어로 첫 프레임도 preload
 *
 * 의존성 없음 (Node 18+).   사용법: node tools/build.mjs [site 폴더] [dist 폴더]
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SITE = path.resolve(process.argv[2] || path.join(root, 'site'));
const DIST = path.resolve(process.argv[3] || path.join(root, 'dist'));

const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
const posix = (p) => p.split(path.sep).join('/');
const stripQuery = (u) => u.split('?')[0].split('#')[0];
const isLocal = (u) => !/^([a-z]+:)?\/\//i.test(u) && !u.startsWith('data:');
// 페이지 기준 참조 → 파일 경로. '/'로 시작하면 사이트 루트(dist/) 기준
const resolveRef = (pageDirAbs, u) => (u.startsWith('/') ? path.join(DIST, stripQuery(u)) : path.resolve(pageDirAbs, stripQuery(u)));

// 아직 공개하지 않는 페이지: 소스(site/)에는 남겨 두고 배포본(dist/)에서만 뺀다. → 주소로 들어와도 404
// 공개할 때는 여기서 지우고, 각 페이지 메뉴에 링크를 다시 넣으면 된다.
// 예) const HIDDEN = new Set(['station-finder', 'station-finder.js'].map((p) => path.join(SITE, p)));
const HIDDEN = new Set([].map((p) => path.join(SITE, p)));

fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(SITE, DIST, { recursive: true, filter: (src) => path.basename(src) !== '.DS_Store' && !HIDDEN.has(src) });

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

const written = new Map(); // 내용 해시 → 출력 상대 경로 (같은 묶음 중복 방지)
function emit(dirRel, name, ext, content) {
  const h = hash(content);
  const rel = posix(path.join(dirRel, `${name}.${h}.${ext}`));
  const abs = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  return rel;
}

// CSS 안의 url(...)을 원래 파일 기준 → 묶음 파일 기준 상대경로로 변환
function rewriteCssUrls(css, fromFileAbs, toDirAbs) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, u) => {
    if (!isLocal(u)) return m;
    const target = path.resolve(path.dirname(fromFileAbs), stripQuery(u));
    const rel = posix(path.relative(toDirAbs, target));
    return `url(${q}${rel}${q})`;
  });
}

// WebP 헤더에서 가로 픽셀 수를 읽는다 (VP8X / VP8 / VP8L)
function webpWidth(file) {
  const b = fs.readFileSync(file);
  const kind = b.toString('latin1', 12, 16);
  if (kind === 'VP8X') return 1 + b.readUIntLE(24, 3);
  if (kind === 'VP8 ') return b.readUInt16LE(26) & 0x3fff;
  if (kind === 'VP8L') return 1 + (b.readUInt16LE(21) & 0x3fff);
  throw new Error(`WebP 형식을 읽을 수 없음: ${file}`);
}

const report = [];
const usedOriginals = new Set();

for (const htmlAbs of htmlFiles) {
  const pageDirAbs = path.dirname(htmlAbs);
  const pageDirRel = path.relative(DIST, pageDirAbs);
  const pageName = pageDirRel === '' ? 'home' : posix(pageDirRel).replace(/\//g, '-');
  let html = fs.readFileSync(htmlAbs, 'utf8');

  const cssTags = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g)].filter((m) => isLocal(m[1]));
  const bundledCss = cssTags.filter((m) => !/fonts\.css/.test(m[1]));
  const fontCss = cssTags.filter((m) => /fonts\.css/.test(m[1]));
  const jsTags = [...html.matchAll(/<script src="([^"]+)"( defer)?><\/script>/g)].filter((m) => isLocal(m[1]));
  const deferJs = jsTags.filter((m) => m[2]);
  const syncJs = jsTags.filter((m) => !m[2]);

  // ---- CSS 묶음 ----
  if (bundledCss.length) {
    const outDirAbs = pageDirAbs; // 묶음은 페이지와 같은 폴더에 두어 상대경로를 단순하게 유지
    const parts = bundledCss.map((m) => {
      const abs = resolveRef(pageDirAbs, m[1]);
      usedOriginals.add(abs);
      return `/* ${posix(path.relative(DIST, abs))} */\n` + rewriteCssUrls(fs.readFileSync(abs, 'utf8'), abs, outDirAbs);
    });
    const rel = emit(posix(pageDirRel), `${pageName}`, 'css', parts.join('\n'));
    const file = path.basename(rel);
    html = html.replace(bundledCss[0][0], `<link rel="stylesheet" href="${file}">`);
    for (const m of bundledCss.slice(1)) html = html.replace(m[0], '');
    report.push([pageName, 'css', bundledCss.length, file]);
  }

  // ---- defer JS 묶음 (문서 순서 = 실행 순서 유지) ----
  if (deferJs.length) {
    const parts = deferJs.map((m) => {
      const abs = resolveRef(pageDirAbs, m[1]);
      usedOriginals.add(abs);
      return `/* ${posix(path.relative(DIST, abs))} */\n` + fs.readFileSync(abs, 'utf8').replace(/\s+$/, '') + '\n;';
    });
    const rel = emit(posix(pageDirRel), `${pageName}`, 'js', parts.join('\n'));
    const file = path.basename(rel);
    html = html.replace(deferJs[0][0], `<script src="${file}" defer></script>`);
    for (const m of deferJs.slice(1)) html = html.replace(m[0], '');
    report.push([pageName, 'js', deferJs.length, file]);
  }

  // ---- 그 외 개별 파일은 해시 파일명으로 ----
  for (const m of [...syncJs, ...fontCss]) {
    const abs = resolveRef(pageDirAbs, m[1]);
    usedOriginals.add(abs);
    const ext = path.extname(abs).slice(1);
    const base = path.basename(abs, '.' + ext);
    const key = abs;
    if (!written.has(key)) {
      const content = fs.readFileSync(abs);
      const h = hash(content);
      const outAbs = path.join(path.dirname(abs), `${base}.${h}.${ext}`);
      fs.writeFileSync(outAbs, content);
      written.set(key, path.basename(outAbs));
    }
    const newName = written.get(key);
    const newRef = stripQuery(m[1]).replace(path.basename(abs), newName);
    html = html.replace(m[0], m[0].replace(m[1], newRef));
  }

  // ---- preload ----
  // 404.html 은 아무 주소에서나 응답되므로(예: /없는/경로/) 절대경로를 쓴다
  const is404 = path.basename(htmlAbs) === '404.html';
  const up = is404 ? '/' : pageDirRel === '' ? '' : '../'.repeat(posix(pageDirRel).split('/').length);
  const preloads = ['Pretendard-Regular', 'Pretendard-Medium', 'Pretendard-Bold']
    .map((f) => `<link rel="preload" href="${up}assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`);
  if (pageDirRel === '' && !is404) preloads.push(
    '<link rel="preload" href="assets/final-800/frame_0001.webp" as="image" type="image/webp" fetchpriority="high" media="(max-width: 759px)">',
    '<link rel="preload" href="assets/final/frame_0001.webp" as="image" type="image/webp" fetchpriority="high" media="(min-width: 760px)">',
  );
  html = html.replace(/(<link rel="stylesheet")/, preloads.join('') + '$1');

  // 모바일 폭(759px 이하)에서는 assets/story/m/ 의 작은 사진을 받게 한다. PC 는 sizes 가 커서 항상 원본을 고른다.
  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    const m = tag.match(/\bsrc="([^"]*assets\/story\/)([^"/?]+\.webp)(?:\?[^"]*)?"/);
    if (!m || /\bsrcset=/.test(tag)) return tag;
    const small = path.join(DIST, 'assets/story/m', m[2]);
    if (!fs.existsSync(small)) return tag;
    const big = webpWidth(path.join(DIST, 'assets/story', m[2]));
    const sw = webpWidth(small);
    return tag.replace(/\bsrc="/, `srcset="${m[1]}m/${m[2]} ${sw}w, ${m[1]}${m[2]} ${big}w" sizes="(max-width: 759px) 100px, 3000px" src="`);
  });

  // 남아 있는 ?v=숫자 제거 (이미지/기타 참조)
  html = html.replace(/(\.(?:css|js|png|webp|svg))\?v=\d+/g, '$1');
  fs.writeFileSync(htmlAbs, html);
}

// 묶음으로 흡수된 원본 css/js 제거 (해시 복사본이 남는 파일은 원본도 제거)
for (const abs of usedOriginals) if (fs.existsSync(abs)) fs.rmSync(abs);

// ---- 검증: 모든 로컬 참조가 실제 파일을 가리키는지 ----
const problems = [];
for (const htmlAbs of htmlFiles) {
  const html = fs.readFileSync(htmlAbs, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const u = m[1];
    if (!isLocal(u) || u.startsWith('mailto:') || u.startsWith('tel:')) continue;
    let target = u.startsWith('/') ? path.join(DIST, u) : path.resolve(path.dirname(htmlAbs), u);
    if (u.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) problems.push(`${path.relative(DIST, htmlAbs)} → ${u}`);
  }
}
const manifest = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else manifest.push({ path: posix(path.relative(DIST, p)), bytes: fs.statSync(p).size });
  }
})(DIST);
fs.writeFileSync(path.join(DIST, '..', 'dist-manifest.json'), JSON.stringify(manifest, null, 1));

console.table(report.map(([page, kind, n, file]) => ({ page, kind, merged: n, file })));
console.log(`files: ${manifest.length}, size: ${(manifest.reduce((a, f) => a + f.bytes, 0) / 1e6).toFixed(1)} MB`);
if (problems.length) {
  console.error('\n깨진 참조:\n' + problems.join('\n'));
  process.exit(1);
}
console.log('OK — 깨진 참조 없음');
