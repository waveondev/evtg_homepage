#!/usr/bin/env bash
# S3 + CloudFront 배포 스크립트
#
#   BUCKET=my-bucket DISTRIBUTION_ID=E123ABC456 ./deploy/deploy.sh
#
# 선택 환경변수
#   AWS_PROFILE   사용할 AWS CLI 프로필
#   AWS_REGION    버킷 리전 (기본 ap-northeast-2)
#   DOMAIN        배포 후 점검할 도메인 (예: www.example.com)
#   DRY_RUN=1     업로드 없이 어떤 파일이 올라갈지만 출력
#   SKIP_BUILD=1  이미 만들어 둔 dist/ 를 그대로 사용
#
# 업로드 순서: (1) 해시 파일·폰트·이미지 → (2) HTML 마지막
#   → 새 HTML 이 올라가는 순간 참조하는 파일은 이미 S3 에 있으므로 중간에 깨진 화면이 노출되지 않는다.
# 오래된 해시 파일은 지우지 않는다(캐시된 이전 HTML 이 잠시 참조할 수 있음). 정리는 README 의 "정리" 항목 참고.
set -euo pipefail

: "${BUCKET:?BUCKET 환경변수가 필요합니다}"
: "${DISTRIBUTION_ID:?DISTRIBUTION_ID 환경변수가 필요합니다}"
export AWS_REGION="${AWS_REGION:-ap-northeast-2}"
export AWS_DEFAULT_REGION="$AWS_REGION"

cd "$(dirname "$0")/.."
command -v aws >/dev/null || { echo "aws CLI 가 필요합니다 (https://aws.amazon.com/cli/)"; exit 1; }

if [ -z "${SKIP_BUILD:-}" ]; then
  node tools/build.mjs site dist
fi
[ -f dist/index.html ] || { echo "dist/index.html 이 없습니다. 먼저 빌드하세요."; exit 1; }

DRY=()
[ -n "${DRY_RUN:-}" ] && DRY=(--dryrun)

IMMUTABLE="public,max-age=31536000,immutable"   # 파일명에 해시가 있거나 바뀌지 않는 파일
MEDIA="public,max-age=2592000"                   # 이미지·프레임(30일). 같은 이름으로 교체했다면 무효화 필요
HTML="no-cache"                                  # 매번 재검증(304) → 항상 최신 HTML

# put <cache-control> <content-type> <include 패턴...>
put() {
  local cache="$1" type="$2"; shift 2
  local inc=(); for p in "$@"; do inc+=(--include "$p"); done
  aws s3 sync dist "s3://$BUCKET" --exclude "*" "${inc[@]}" \
    --cache-control "$cache" --content-type "$type" --only-show-errors ${DRY[@]+"${DRY[@]}"}
}

echo "▶ 1/3 정적 파일 업로드"
put "$IMMUTABLE" "text/css; charset=utf-8"        "*.css"
put "$IMMUTABLE" "text/javascript; charset=utf-8" "*.js"
put "$IMMUTABLE" "font/woff2"                     "assets/fonts/*.woff2"
put "$MEDIA"     "image/webp"                     "*.webp"
put "$MEDIA"     "image/png"                      "*.png"
put "$MEDIA"     "image/jpeg"                     "*.jpg" "*.jpeg"
put "$MEDIA"     "image/svg+xml"                  "*.svg"

echo "▶ 2/3 HTML 업로드"
put "$HTML"      "text/html; charset=utf-8"       "*.html"

# 위 목록에 없는 확장자가 있으면 알려준다
UNKNOWN=$(cd dist && find . -type f ! \( -name '*.css' -o -name '*.js' -o -name '*.woff2' -o -name '*.webp' -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.svg' -o -name '*.html' \) | head -20)
[ -z "$UNKNOWN" ] || { echo "⚠ 업로드 대상에 포함되지 않은 파일(deploy.sh 의 put 목록에 추가 필요):"; echo "$UNKNOWN"; }

if [ -n "${DRY_RUN:-}" ]; then echo "DRY_RUN — 무효화/점검 생략"; exit 0; fi

echo "▶ 3/3 CloudFront 캐시 무효화"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" \
  --paths "/" "/index.html" "/404.html" "/product/*" "/about/*" "/esg/*" \
  --query 'Invalidation.{Id:Id,Status:Status}' --output table

if [ -n "${DOMAIN:-}" ]; then
  echo "▶ 점검: https://$DOMAIN"
  for p in "/" "/product" "/about/" "/esg/" "/no-such-page-$$"; do
    printf '%-28s ' "$p"; curl -s -o /dev/null -w '%{http_code}  %{content_type}\n' "https://$DOMAIN$p"
  done
  echo "(기대값: / 200, /product 301, /about/ 200, /esg/ 200, 없는 경로 404)"
fi
echo "✔ 완료"
