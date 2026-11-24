# S3 + CloudFront 배포 가이드

구조: **브라우저 → CloudFront(CDN, HTTPS) → S3(비공개 버킷, OAC)**
버킷은 공개하지 않고 CloudFront 만 읽도록 합니다.

## 0. 준비물
- AWS CLI v2 (`aws configure` 또는 SSO 프로필), Node 18+
- 도메인을 연결한다면 **us-east-1** 의 ACM 인증서 (CloudFront 는 이 리전만 사용)

## 1. S3 버킷 (1회)
1. 버킷 생성 — 리전 `ap-northeast-2`, **퍼블릭 액세스 모두 차단 ON**, 정적 웹사이트 호스팅 **사용 안 함**
   (REST 엔드포인트 + OAC 를 쓰는 방식이 권장)
2. 버킷 정책은 3단계에서 CloudFront 를 만든 뒤 `deploy/bucket-policy.json` 로 등록

## 2. CloudFront 함수 (1회)
`deploy/cloudfront-function-rewrite.js` 를 **CloudFront → 함수 → 함수 생성(런타임 cloudfront-js-2.0)** 로 등록 후 **게시**.
- `/about/` → `/about/index.html` 변환 (S3 는 이걸 자동으로 못 합니다)
- `/about` → `/about/` 로 301 (기존 Firebase `trailingSlash: true` 와 같은 동작, `?lang=en` 유지)

## 3. CloudFront 배포 (1회)
| 항목 | 값 |
|---|---|
| 오리진 | S3 버킷 (REST 엔드포인트, `bucket.s3.ap-northeast-2.amazonaws.com`) |
| 오리진 액세스 | **Origin access control (OAC)** 새로 생성, 서명 요청 |
| 뷰어 프로토콜 | Redirect HTTP to HTTPS |
| 캐시 정책 | **CachingOptimized** (Brotli/Gzip 압축 자동 적용) |
| 응답 헤더 정책 | **SecurityHeadersPolicy** (또는 직접 정의) |
| 함수 연결 | 뷰어 요청 → 2단계 함수 |
| 기본 루트 객체 | `index.html` |
| HTTP 버전 | HTTP/2 + HTTP/3 |
| 대체 도메인 / 인증서 | 사용할 도메인, us-east-1 ACM 인증서 |
| 사용자 지정 오류 응답 | 403 → `/404.html` (응답 코드 404), 404 → `/404.html` (응답 코드 404) |

배포를 만들면 CloudFront 가 "버킷 정책 복사" 를 안내합니다. 또는 `deploy/bucket-policy.json` 의
`<BUCKET_NAME>`, `<AWS_ACCOUNT_ID>`, `<DISTRIBUTION_ID>` 를 채워 버킷 정책에 붙여 넣으세요.

> 403 → 404 오류 응답이 필요한 이유: 비공개 버킷에서 없는 파일을 요청하면 S3 가 404 가 아닌 403 을 돌려줍니다.

### 스테이션 찾기 API 경로 (1회, `/station-finder/` 배포 전에 필수)
지도는 스테이션 목록을 같은 도메인의 `/api/w/map/stations` 에서 받습니다. API 서버는 다른 도메인의 브라우저 요청을 CORS 로 막으므로 CloudFront 가 대신 전달합니다.
- 오리진 추가: `api.ev-tago.com` (HTTPS only)
- 동작 추가: 경로 패턴 `/api/w/map/stations`, 메서드 GET/HEAD, Redirect HTTP to HTTPS
- 캐시 정책: 사용자 지정 — 최소·기본·최대 TTL 60초, 쿼리스트링·쿠키·헤더 모두 캐시 키에서 제외 (API 응답이 `no-store` 라 CachingOptimized 로는 캐시되지 않습니다. 최소 TTL 을 60초로 둬야 합니다)
- 원본 요청 정책: `None` (Origin 헤더를 전달하면 API 서버가 403 을 돌려줍니다)
- **뷰어 요청 함수는 연결하지 않음** (연결하면 2단계 함수가 `/` 를 붙이는 301 을 보냅니다)

카카오 개발자 콘솔의 JavaScript SDK 도메인에 사이트 도메인을 등록해야 지도가 표시됩니다. (로컬 확인은 `http://localhost:8080` 도 등록)

## 4. 배포 (이후 매번)
```bash
cd v2
BUCKET=my-site-bucket DISTRIBUTION_ID=E123ABC456 ./deploy/deploy.sh
# 먼저 확인만 하려면:  DRY_RUN=1 BUCKET=... DISTRIBUTION_ID=... ./deploy/deploy.sh
# 배포 후 자동 점검:    DOMAIN=www.example.com ... ./deploy/deploy.sh
```
스크립트가 하는 일: `site/` 빌드 → `dist/` → 정적 파일 업로드 → HTML 업로드(마지막) → CloudFront 무효화.

최소 권한 IAM 정책은 `deploy/iam-deployer-policy.json` 을 사용하세요.

## 5. 캐시 정책 (deploy.sh 에 반영됨)
| 대상 | Cache-Control | 비고 |
|---|---|---|
| `*.html` | `no-cache` | 매번 재검증(304). 배포 즉시 반영 |
| `home.<해시>.css/js` 등 묶음, 폰트 | `max-age=31536000, immutable` | 내용이 바뀌면 파일명이 바뀜 |
| 이미지·히어로 프레임 | `max-age=2592000` (30일) | **같은 이름으로 교체하면** 이미지는 새 이름으로 올리거나 무효화 + 사용자 캐시 최대 30일 |

## 6. 정리 (가끔)
배포마다 새 해시 파일이 쌓입니다. 이전 HTML 을 캐시한 방문자를 위해 바로 지우지 말고,
몇 주에 한 번 `dist-manifest.json` 에 없는 키를 지우세요.
```bash
aws s3api list-objects-v2 --bucket $BUCKET --query 'Contents[].Key' --output text | tr '\t' '\n' | sort > /tmp/remote.txt
node -e "console.log(require('./dist-manifest.json').map(f=>f.path).sort().join('\n'))" | sort > /tmp/local.txt
comm -23 /tmp/remote.txt /tmp/local.txt          # ← 지워질 대상 목록 확인 후 aws s3 rm 으로 삭제
```

## 7. 롤백
이전 버전 소스로 `./deploy/deploy.sh` 를 다시 실행하면 됩니다. (HTML 이 no-cache 라 바로 되돌아갑니다)

## 8. 확인 체크리스트
- `/` 200, `/product` → 301 `/product/`, `/about/` 200, `/esg/` 200, 없는 주소 404
- `/api/w/map/stations` 200 (JSON), 두 번째 요청부터 `x-cache: Hit from cloudfront`, `/station-finder/` 에서 마커 표시
- 응답 헤더 `content-encoding: br` (HTML/CSS/JS), `x-cache: Hit from cloudfront` (두 번째 요청부터)
- `.webp` 응답 `content-type: image/webp`, 폰트 `font/woff2`
