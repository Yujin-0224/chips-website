# CHIPS Portfolio Website

CHIPS 팀 성우 포트폴리오 웹사이트의 첫 정적 프로토타입입니다.

## 실행

VS Code에서 이 폴더를 열고 `index.html`을 브라우저로 열면 바로 확인할 수 있습니다.

권장 확장:

- Live Server

Live Server를 쓰면 수정 후 새로고침 없이 레이아웃을 확인하기 편합니다.

## 구성

- `index.html`: 화면 구조
- `styles.css`: 레이아웃과 CHIPS 컬러 스타일
- `script.js`: 성우 목록, 필터, 프로필 상세, 샘플 재생, 문의 메일 연결

## 다음에 교체할 부분

- 실제 CHIPS 로고 이미지가 생기면 `.cracker-logo` 영역을 이미지로 교체
- 메인 배경 이미지는 `assets/chips-hero.jpg`로 저장하면 자동 적용
- 첫 화면 감자칩 이미지는 `assets/chips-chip.png`로 저장하면 자동 적용
- 실제 성우 사진이 생기면 `script.js`의 actor 데이터에 이미지 경로 추가
- 실제 오디오 파일이 생기면 현재 브라우저 톤 미리듣기 대신 `<audio>` 파일 재생으로 교체
- 문의 수신 주소는 `script.js`의 `contact@chips-voice.com`을 실제 이메일로 변경

정식 서버에서 문의 메일을 자동 발송하려면 EmailJS, Formspree, 또는 별도 백엔드 API 연결이 필요합니다.
