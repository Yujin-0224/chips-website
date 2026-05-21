# CHIPS 성우 포트폴리오 웹사이트

성우 프로필과 오디오 샘플을 소개하기 위한 포트폴리오 웹사이트입니다.
정적 웹사이트를 기본으로 만들고, Google Sheets와 Cloudflare R2를 활용해 프로필과 음성 샘플을 관리할 수 있도록 구성했습니다.

## 프로젝트 소개

CHIPS는 여러 성우의 프로필, 음색 태그, 샘플 오디오를 한 곳에서 확인할 수 있는 웹사이트입니다.
단순 소개 페이지에서 시작했지만, 운영자가 매번 HTML을 직접 수정하지 않아도 되도록 Google Sheets 기반 CMS와 관리자 페이지 기능을 추가했습니다.

## 주요 기능

- 성우 프로필 목록 및 상세 정보 표시
- 성별, 나이대, 톤, 감정 등 조건별 필터링
- 오디오 샘플 재생
- Google Sheets 데이터를 사이트 데이터로 동기화
- 성우 프로필 등록 및 수정 요청 페이지
- 오디오 업로드 페이지
- 로그인 및 가입 요청 페이지
- 관리자 페이지에서 프로필, 오디오, 가입 요청 승인
- Cloudflare R2를 활용한 오디오 파일 저장

## 사용 기술

- HTML
- CSS
- JavaScript
- Node.js
- GitHub Actions
- Google Sheets
- Cloudflare Pages
- Cloudflare R2
- Cloudflare Pages Functions

## 배포

Cloudflare Pages에 연결해 배포했습니다.

```text
https://chips-website.pages.dev
```

## 로컬 실행

```powershell
npm start
```

브라우저에서 아래 주소로 확인할 수 있습니다.

```text
http://127.0.0.1:8000
```

## Google Sheets CMS

성우 프로필과 오디오 샘플 데이터는 Google Sheets에서 관리하고, GitHub Actions를 통해 정적 JSON 데이터로 동기화하는 구조입니다.

- 예약 동기화: GitHub Actions로 주기적 실행
- 수동 동기화: GitHub Actions에서 직접 실행
- 로컬 동기화: PowerShell 스크립트로 실행

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1
```

관련 설명은 [docs/google-sheet-cms.md](docs/google-sheet-cms.md)에 정리했습니다.

## 주요 페이지

```text
index.html              # 메인 포트폴리오 페이지
login.html              # 로그인 페이지
signup-request.html     # 가입 요청 페이지
profile-create.html     # 프로필 등록 페이지
audio-create.html       # 오디오 업로드 페이지
admin.html              # 관리자 페이지
```

## 폴더 구조

```text
assets/                 # 이미지, 오디오, 폰트 등 정적 파일
data/                   # 사이트에서 읽는 CMS JSON 데이터
docs/                   # CMS 문서와 템플릿 파일
functions/api/          # Cloudflare Pages Functions API
scripts/                # Google Sheets 동기화 스크립트
```

## 작업하면서 구현한 부분

- 정적 웹사이트 화면 구성
- 성우 데이터 필터링과 상세 정보 표시
- 오디오 샘플 재생 UI
- Google Sheets 데이터를 JSON으로 변환하는 동기화 흐름
- Cloudflare Pages 배포
- Cloudflare R2 업로드 구조
- 관리자 승인 흐름

## 배운 점

- 정적 사이트도 외부 데이터와 서버리스 기능을 연결하면 간단한 CMS처럼 운영할 수 있다는 점을 배웠습니다.
- Cloudflare Pages, R2, Functions를 함께 사용하며 배포와 파일 저장 흐름을 경험했습니다.
- 운영자가 실제로 사용할 수 있는 페이지를 만들려면 화면뿐 아니라 데이터 관리, 승인 흐름, 예외 처리가 중요하다는 점을 알게 되었습니다.

## 참고

현재 저장소에는 개발 및 포트폴리오 정리용 코드가 함께 들어 있습니다.
실제 운영 시에는 관리자 토큰, R2 설정값, Google Sheets 관련 정보는 공개 저장소에 올리지 않고 별도로 관리해야 합니다.
