# CHIPS Voice Portfolio

CHIPS는 성우 프로필과 보이스 샘플을 한 곳에서 탐색하고, 운영자가 별도 코드 수정 없이 콘텐츠를 관리할 수 있도록 만든 성우 포트폴리오 웹사이트입니다.

단순한 정적 소개 페이지에서 시작해, 현재는 Cloudflare Pages Functions와 R2를 이용해 프로필, 오디오, 뉴스, 계정 권한을 관리하는 작은 CMS 형태로 확장되었습니다.

## 배포 주소

[https://chips-website.pages.dev](https://chips-website.pages.dev)

## 프로젝트 목표

- 클라이언트가 성우별 프로필과 음성 샘플을 빠르게 비교할 수 있는 웹사이트 구축
- 성우가 직접 프로필과 오디오를 등록하고 관리할 수 있는 운영 페이지 제공
- 관리자 승인, 계정 관리, 뉴스 작성 등 실제 운영에 필요한 워크플로우 구현
- GitHub Pages 수준의 정적 사이트에서 Cloudflare 기반 서버리스 CMS 구조로 확장

## 주요 기능

### 공개 웹사이트

- TOP, STUDIO, MEMBERS, PROJECTS, CONTACT 섹션으로 구성된 반응형 웹사이트
- 성우 프로필 목록과 상세 프로필 화면
- 프로필 이미지, 이름, 영문 표기, 소개글, 작업 가능 조건, 커리어 정보 표시
- 보이스 샘플 플레이어와 볼륨 조절
- 성별, 나이대, 톤, 음색, 감정, 언어, 억양, 캐릭터 타입 기반 샘플 검색
- 검색 결과 카드와 오디오 미리듣기
- Studio 뉴스 목록, 상세 기사, TOP 뉴스 미리보기
- CONTACT 문의 폼과 제출 완료 모달

### 멤버 기능

- 승인된 멤버 계정 로그인
- 본인 프로필 작성 및 수정 요청
- 본인 오디오 샘플 업로드
- 오디오 종류 선택: 자기소개 오디오, 일반 샘플 오디오
- 대표 해시태그 등록
- 오디오 메모 작성
- 오디오 제목, 카테고리, 해시태그, 메모 수정
- 드래그 앤 드롭 방식의 오디오 순서 변경

### 관리자 기능

- 관리자 계정 전용 메뉴 표시
- 회원가입 요청 승인 및 거절
- 멤버/관리자 계정 생성과 삭제
- 프로필 수정 요청 승인 및 거절
- 공개 프로필 삭제
- 모든 성우의 오디오 관리
- Studio 뉴스 작성, 수정, 삭제
- 뉴스 이미지 업로드 및 R2 저장

## 기술 스택

### Frontend

- HTML
- CSS
- Vanilla JavaScript
- 반응형 레이아웃
- 커스텀 오디오 플레이어
- SortableJS를 이용한 드래그 앤 드롭 정렬

### Backend / Serverless

- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare R2
- R2 기반 JSON CMS 데이터 저장
- 토큰 기반 로그인 세션
- 관리자/멤버 권한 분리

### Data / CMS

- `cms/cms-data.json`을 중심으로 한 공개 데이터 구조
- 성우 프로필, 오디오 소스, 뉴스 데이터를 JSON으로 관리
- Google Sheets 동기화 스크립트도 유지하여 초기 CMS 데이터 관리 가능

### Tooling

- Node.js 로컬 정적 서버
- Git / GitHub
- GitHub Actions
- Wrangler 설정 파일

## 시스템 구조

```text
Cloudflare Pages
├─ 정적 프론트엔드
│  ├─ index.html
│  ├─ script.js
│  └─ styles.css
│
├─ Pages Functions API
│  ├─ auth/login
│  ├─ auth/signup-request
│  ├─ submit-profile
│  ├─ update-profile
│  ├─ upload-audio
│  ├─ manage-audio
│  └─ admin/*
│
└─ Cloudflare R2
   ├─ cms/cms-data.json
   ├─ approved/audio/*
   ├─ approved/news/*
   └─ auth/*
```

## 주요 구현 포인트

- 정적 웹사이트에 서버리스 API를 붙여 실제 운영 가능한 CMS 흐름 구현
- 성우별 권한을 분리하여 멤버는 본인 프로필과 오디오만 관리 가능
- 관리자는 모든 프로필, 오디오, 뉴스, 계정 요청을 관리 가능
- 오디오 파일은 Cloudflare R2에 저장하고 공개 CMS JSON에는 재생 URL과 메타데이터만 기록
- 자기소개 오디오는 프로필 상단에 고정하고, 일반 샘플은 검색 결과에 노출
- 카테고리 검색은 선택 조건에 따라 결과 수를 미리 계산
- 검색 결과는 여러 오디오를 카드 형태로 표시하고, 페이지형 캐러셀 UI로 탐색
- 프로필 작성 화면에서 실제 공개 프로필과 유사한 미리보기 제공
- 뉴스 작성 페이지를 추가하여 Studio 메뉴 콘텐츠를 관리자 페이지에서 관리

## 파일 구조

```text
index.html              공개 웹사이트
script.js               공개 페이지 렌더링, 검색, 오디오 플레이어, 라우팅
styles.css              공개 웹사이트 스타일

login.html              로그인 페이지
signup-request.html     회원가입 요청 페이지
profile-create.html     프로필 작성/수정 페이지
audio-create.html       오디오 업로드 페이지
audio-manage.html       오디오 관리 페이지
news-manage.html        관리자 뉴스 작성 페이지
admin.html              관리자 승인/계정/프로필 관리 페이지

submission.js           운영 페이지 공통 로직
audio-manage.js         오디오 관리 로직
news-manage.js          뉴스 작성/수정/삭제 로직
admin.js                관리자 페이지 로직
auth.js                 로그인 로직

functions/api/          Cloudflare Pages Functions API
assets/                 이미지, 폰트, 오디오, 벤더 파일
data/                   로컬 fallback CMS JSON
docs/                   Google Sheets CMS 문서와 템플릿
scripts/                CMS 동기화 스크립트
wrangler.toml           Cloudflare Pages/R2 설정
```

## 로컬 실행

```bash
npm start
```

브라우저에서 아래 주소로 접속합니다.

```text
http://127.0.0.1:8000
```

## 환경 설정

Cloudflare Pages 배포 환경에서 다음 항목이 필요합니다.

- `CHIPS_MEDIA`: Cloudflare R2 bucket binding
- `ADMIN_TOKEN`: 관리자 전용 민감 작업에 사용하는 개발자 토큰

R2 bucket 이름은 현재 `chips-media`로 설정되어 있습니다.

## 진행 상태

현재 구현 완료:

- 공개 웹사이트 UI
- 성우 프로필 목록/상세 화면
- 오디오 업로드 및 R2 저장
- 오디오 관리와 순서 변경
- 로그인, 회원가입 요청, 관리자 승인
- 관리자 계정/프로필/뉴스 관리
- Studio 뉴스 CMS화
- Cloudflare Pages 배포

개선 예정:

- 이미지 업로드 시 자동 리사이징/압축
- 오디오 파일 자동 변환 또는 압축
- 관리자 페이지 UI 정리
- 데이터 백업 자동화
- 더 세밀한 접근 권한과 비밀번호 재설정 기능

## 회고

이 프로젝트는 정적 웹사이트에서 시작했지만, 실제 운영을 고려하면서 계정, 권한, 파일 업로드, 승인 플로우, CMS 데이터 관리까지 확장되었습니다.

프레임워크 없이 HTML/CSS/Vanilla JavaScript로 구현했기 때문에 파일 구조가 커질수록 복잡도가 빠르게 올라가는 한계도 경험했습니다. 대신 Cloudflare Pages Functions와 R2를 연결해 정적 사이트에서도 실사용 가능한 운영 도구를 만들 수 있다는 점을 확인한 프로젝트입니다.

다음 단계에서는 프론트엔드 구조를 컴포넌트 기반으로 정리하고, 업로드 파일 최적화와 백업 자동화를 추가해 운영 안정성을 높일 계획입니다.
