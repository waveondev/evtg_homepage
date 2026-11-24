// CloudFront Function (runtime: cloudfront-js-2.0) — Viewer request
//
// S3 는 폴더 경로의 index.html 을 자동으로 찾아주지 않으므로 보완한다.
//   /            → /index.html
//   /about/      → /about/index.html
//   /about       → 301 /about/        (기존 Firebase 설정 trailingSlash:true 와 동일, ?lang=en 등 쿼리스트링 유지)
//   /app.js 등 확장자가 있는 경로는 그대로 통과
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.charAt(uri.length - 1) === '/') {
    request.uri = uri + 'index.html';
    return request;
  }

  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (last.indexOf('.') === -1) {
    var parts = [];
    var qs = request.querystring || {};
    Object.keys(qs).forEach(function (k) {
      var q = qs[k];
      if (q.multiValue) q.multiValue.forEach(function (m) { parts.push(k + '=' + m.value); });
      else parts.push(q.value === '' ? k : k + '=' + q.value);
    });
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri + '/' + (parts.length ? '?' + parts.join('&') : '') } }
    };
  }
  return request;
}
