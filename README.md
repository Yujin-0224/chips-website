# CHIPS 성우 포트폴리오 웹사이트

성우 프로필과 오디오 샘플을 모아 볼 수 있는 웹사이트입니다.

처음에는 성우 소개용 정적 페이지로 시작했고, 작업하면서 Google Sheets 데이터 연동, 오디오 업로드, 관리자 승인 기능까지 붙여보았습니다.
아직 구조가 완전히 깔끔한 프로젝트는 아니지만, Cloudflare로 실제 배포하고 운영 흐름까지 경험해본 프로젝트입니다.

## 만든 이유

- 성우 프로필과 샘플 음성을 한 페이지에서 보기 쉽게 보여주고 싶었습니다.
- 매번 HTML을 직접 수정하지 않고, Google Sheets에서 데이터를 관리하는 구조를 만들어보고 싶었습니다.
- 정적 웹사이트에 서버리스 기능을 붙이면 어느 정도까지 운영 기능을 만들 수 있는지 경험해보고 싶었습니다.

## 주요 기능

- 성우 프로필 목록과 상세 정보 표시
- 성별, 나이대, 톤, 감정 등 조건별 필터
- 오디오 샘플 재생
- Google Sheets 데이터를 JSON으로 동기화
- 성우 프로필 등록 / 수정 요청
- 오디오 샘플 업로드
- 로그인, 가입 요청, 관리자 승인
- Cloudflare R2를 이용한 오디오 파일 저장

## 사용 기술

- HTML, CSS, JavaScript
- Node.js
- GitHub Actions
- Google Sheets
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare R2

## 배포 주소

```text
https://chips-website.pages.dev
```

## 로컬 실행

```powershell
npm start
```

```text
http://127.0.0.1:8000
```

## 파일 설명

기능을 하나씩 추가하면서 HTML, JS 파일이 루트에 많이 남아 있습니다.
현재는 파일 위치를 크게 옮기지 않고, 페이지별 역할만 나누어 둔 상태입니다.

```text
index.html              # 메인 성우 포트폴리오 화면
script.js               # 메인 화면 데이터 렌더링, 필터, 오디오 재생
styles.css              # 메인 화면 스타일

login.html              # 로그인 화면
signup-request.html     # 성우 계정 신청 화면
profile-create.html     # 프로필 등록 화면
profile-edit.html       # 프로필 수정 화면
audio-create.html       # 오디오 업로드 화면
audio-manage.html       # 오디오 관리 화면
news-manage.html        # 공지/소식 관리 화면
admin.html              # 관리자 화면

functions/api/          # Cloudflare Pages Functions API
data/                   # 사이트에서 읽는 CMS JSON 데이터
docs/templates/         # Google Sheets용 샘플 템플릿
scripts/                # Google Sheets 동기화 스크립트
assets/                 # 이미지, 오디오, 폰트 등 정적 파일
```

## Google Sheets CMS

성우 정보와 오디오 샘플 데이터를 Google Sheets에서 관리하고, GitHub Actions로 `data/cms-data.json` 파일을 갱신하는 방식입니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/sync-cms-from-google-sheet.ps1
```

자세한 컬럼 구성은 [docs/google-sheet-cms.md](docs/google-sheet-cms.md)에 따로 정리했습니다.

## 작업하면서 해본 것

- 정적 페이지를 Cloudflare Pages로 배포
- Google Sheets 데이터를 사이트용 JSON으로 변환
- 성우 목록 필터와 상세 프로필 화면 구현
- 오디오 샘플 재생 UI 구현
- Cloudflare R2에 오디오 파일 업로드
- 관리자 페이지에서 프로필, 오디오, 가입 요청 승인 처리

## 느낀 점

단순한 소개 페이지로 시작했지만, 실제로 운영하려고 보니 데이터 관리, 업로드, 승인 흐름이 필요했습니다.
이 프로젝트를 하면서 정적 웹사이트도 Cloudflare Pages Functions, R2, GitHub Actions를 연결하면 간단한 운영 도구처럼 만들 수 있다는 것을 알게 되었습니다.

또 기능을 계속 붙이다 보면 파일 구조가 금방 복잡해진다는 것도 느꼈습니다.
다음에 비슷한 프로젝트를 만든다면 처음부터 페이지, 스크립트, 스타일 폴더를 나누고 시작할 것 같습니다.

## 주의

관리자 토큰, R2 설정값, Google Sheets 관련 설정값은 공개 저장소에 직접 올리지 않아야 합니다.
