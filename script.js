const actors = [
  {
    id: "haru",
    name: "김하루",
    nameEn: "KIM HARU",
    gender: "female",
    tone: "clear",
    style: "twenties",
    category: "animation",
    mood: "bright",
    colors: ["#ffc857", "#3bb7a3"],
    bio: "맑고 선명한 발성에 밝은 에너지가 강점입니다. 애니메이션, 게임 캐릭터, 브랜드 캠페인 샘플에 잘 어울립니다.",
    tags: ["밝음", "청량", "애니메이션", "20대"],
    demos: ["캐릭터 - 활발", "광고 - 산뜻", "게임 - 주인공"],
  },
  {
    id: "min",
    name: "이도윤",
    nameEn: "LEE DOYUN",
    gender: "male",
    tone: "deep",
    style: "thirties",
    category: "narration",
    mood: "serious",
    colors: ["#5b6c7d", "#b7c9d6"],
    bio: "차분하고 깊은 톤으로 정보 전달력이 좋습니다. 다큐멘터리, 기업 영상, 시네마틱 내레이션에 적합합니다.",
    tags: ["저음", "신뢰감", "내레이션", "30대"],
    demos: ["내레이션 - 다큐", "광고 - 프리미엄", "게임 - 지휘관"],
  },
  {
    id: "yuna",
    name: "박유나",
    nameEn: "PARK YUNA",
    gender: "female",
    tone: "warm",
    style: "thirties",
    category: "commercial",
    mood: "calm",
    colors: ["#ef6f61", "#f7c59f"],
    bio: "따뜻하고 자연스러운 말맛을 살립니다. 라이프스타일 광고, 오디오북, 안내 음성에 잘 맞습니다.",
    tags: ["따뜻함", "친근", "광고", "30대"],
    demos: ["광고 - 라이프", "안내 - 친절", "오디오북 - 감성"],
  },
  {
    id: "jin",
    name: "최서진",
    nameEn: "CHOI SEOJIN",
    gender: "male",
    tone: "bright",
    style: "teen",
    category: "game",
    mood: "energetic",
    colors: ["#36a7ff", "#ffd26a"],
    bio: "반응이 빠르고 캐릭터 변주 폭이 넓습니다. 게임, 숏폼 콘텐츠, 하이텐션 광고에 어울립니다.",
    tags: ["활기", "소년", "게임", "10대"],
    demos: ["게임 - 소년", "광고 - 텐션", "애니 - 코미디"],
  },
  {
    id: "sua",
    name: "정수아",
    nameEn: "JUNG SUA",
    gender: "female",
    tone: "clear",
    style: "forties",
    category: "narration",
    mood: "serious",
    colors: ["#8e7cc3", "#bfd7ea"],
    bio: "정돈된 딕션과 안정적인 호흡으로 긴 문장도 편안하게 이끕니다. 교육, 기관, 브랜드 필름에 적합합니다.",
    tags: ["정확", "우아", "교육", "40대+"],
    demos: ["교육 - 설명", "기관 - 안내", "브랜드 - 담백"],
  },
  {
    id: "rion",
    name: "한리온",
    nameEn: "HAN RION",
    gender: "male",
    tone: "warm",
    style: "twenties",
    category: "animation",
    mood: "cute",
    colors: ["#1d8f75", "#f6d365"],
    bio: "부드러운 미성과 귀여운 캐릭터 톤이 장점입니다. 애니메이션, 게임 NPC, 캐주얼 광고에 잘 어울립니다.",
    tags: ["미성", "귀여움", "캐릭터", "20대"],
    demos: ["애니 - 소년", "게임 - NPC", "광고 - 캐주얼"],
  },
];

const sampleGrid = document.querySelector("#sample-grid");
const actorGrid = document.querySelector("#actor-grid");
const actorDetail = document.querySelector("#actor-detail");
const homePage = document.querySelector("#home");
const appPages = [...document.querySelectorAll(".app-page")];
const detailAvatar = document.querySelector("#detail-avatar");
const detailName = document.querySelector("#detail-name");
const detailNameEn = document.querySelector("#detail-name-en");
const detailBio = document.querySelector("#detail-bio");
const detailTags = document.querySelector("#detail-tags");
const demoGrid = document.querySelector("#demo-grid");
const filterForm = document.querySelector(".sample-filter");
const sampleEmpty = document.querySelector("#sample-empty");
const statusEl = document.querySelector("#form-status");
const navLinks = [...document.querySelectorAll(".nav-link")];

document
  .querySelectorAll(".section-title-row, .page-heading, .sample-filter, .sample-empty, .info-content, .actor-card, .sample-card, .demo-card, .contact-form")
  .forEach((element) => element.classList.add("reveal"));

function setAvatarVars(element, actor) {
  element.style.setProperty("--avatar-a", actor.colors[0]);
  element.style.setProperty("--avatar-b", actor.colors[1]);
}

function playPreview(seed = 220) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const gain = context.createGain();
  const oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = seed;
  gain.gain.setValueAtTime(0.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.7);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.75);
}

function renderSamples(list = actors) {
  sampleEmpty.hidden = true;
  sampleGrid.innerHTML = list
    .map(
      (actor, index) => `
        <article class="sample-card">
          <div>
            <div class="avatar" style="--avatar-a:${actor.colors[0]}; --avatar-b:${actor.colors[1]}"></div>
            <div class="sample-player">
              <button class="play-button" type="button" data-pitch="${230 + index * 38}" aria-label="${actor.name} 샘플 재생">▶</button>
              <span class="wave"></span>
              <small>0:30</small>
            </div>
          </div>
          <p>${actor.name} · ${actor.tags.slice(0, 3).join(" / ")}</p>
        </article>
      `,
    )
    .join("");
  observeReveals();
}

function renderActors() {
  actorGrid.innerHTML = actors
    .map(
      (actor) => `
        <button class="actor-card" type="button" data-actor="${actor.id}" style="--avatar-a:${actor.colors[0]}; --avatar-b:${actor.colors[1]}">
          <span class="actor-photo"></span>
          <span class="actor-card-info">
            <strong>${actor.name}</strong>
            <span>${actor.nameEn}</span>
          </span>
        </button>
      `,
    )
    .join("");
  document.querySelectorAll(".actor-card").forEach((element) => element.classList.add("reveal"));
  observeReveals();
}

function openActor(actorId) {
  const actor = actors.find((item) => item.id === actorId) || actors[0];
  setAvatarVars(detailAvatar, actor);
  detailName.textContent = actor.name;
  detailNameEn.textContent = actor.nameEn;
  detailBio.textContent = actor.bio;
  detailTags.textContent = `추천 감정 · ${actor.tags.join(" · ")}`;
  demoGrid.innerHTML = actor.demos
    .map(
      (demo, index) => `
        <div class="demo-card">
          <strong>${demo}</strong>
          <div class="sample-player">
            <button class="play-button" type="button" data-pitch="${260 + index * 70}" aria-label="${demo} 재생">▶</button>
            <span class="wave"></span>
            <small>0:${24 + index * 3}</small>
          </div>
        </div>
      `,
    )
    .join("");
  document.querySelectorAll(".demo-card").forEach((element) => element.classList.add("reveal"));
  observeReveals();
  actorDetail.hidden = false;
  document.querySelector("#actors").hidden = true;
  actorDetail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function filterSamples() {
  const filters = {
    gender: document.querySelector("#filter-gender").value,
    tone: document.querySelector("#filter-tone").value,
    style: document.querySelector("#filter-style").value,
    category: document.querySelector("#filter-category").value,
    mood: document.querySelector("#filter-mood").value,
  };
  const hasFilter = Object.values(filters).some(Boolean);
  if (!hasFilter) {
    sampleGrid.innerHTML = "";
    sampleEmpty.hidden = false;
    sampleEmpty.textContent = "카테고리를 하나 이상 선택하고 검색해 주세요.";
    return;
  }

  const filtered = actors.filter((actor) =>
    Object.entries(filters).every(([key, value]) => !value || actor[key] === value),
  );
  if (!filtered.length) {
    sampleGrid.innerHTML = "";
    sampleEmpty.hidden = false;
    sampleEmpty.textContent = "조건에 맞는 성우 샘플이 아직 없습니다.";
    return;
  }
  renderSamples(filtered);
}

document.addEventListener("click", (event) => {
  const playButton = event.target.closest(".play-button");
  if (playButton) {
    playPreview(Number(playButton.dataset.pitch));
  }

  const actorButton = event.target.closest("[data-actor]");
  if (actorButton) {
    openActor(actorButton.dataset.actor);
  }
});

document.querySelector("#sample-search").addEventListener("click", filterSamples);

document.querySelector("#back-to-actors").addEventListener("click", () => {
  actorDetail.hidden = true;
  document.querySelector("#actors").hidden = false;
  document.querySelector("#actors").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`[CHIPS 문의] ${data.get("name")}님 문의`);
  const body = encodeURIComponent(
    [
      `성명: ${data.get("name")}`,
      `회사명: ${data.get("company") || "-"}`,
      `연락처: ${data.get("phone")}`,
      `E-mail: ${data.get("email")}`,
      "",
      "신청 내용:",
      data.get("message"),
    ].join("\n"),
  );
  window.location.href = `mailto:contact@chips-voice.com?subject=${subject}&body=${body}`;
  statusEl.textContent = "메일 앱이 열리면 내용을 확인한 뒤 발송해 주세요.";
});

function setActiveNav(targetHash) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === targetHash);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 },
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function showRoute() {
  const hash = window.location.hash || "#top";
  const isAppPage = ["#actors", "#services", "#contact"].includes(hash);

  homePage.hidden = isAppPage;
  appPages.forEach((page) => {
    page.hidden = true;
  });

  if (isAppPage) {
    const page = document.querySelector(hash);
    if (page) page.hidden = false;
    actorDetail.hidden = true;
    setActiveNav(hash);
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  setActiveNav("#top");
  if (hash === "#voice-sample") {
    document.querySelector("#voice-sample").scrollIntoView({ behavior: "smooth" });
  } else if (hash === "#info") {
    document.querySelector("#info").scrollIntoView({ behavior: "smooth" });
  } else {
    document.querySelector("#top").scrollIntoView({ behavior: "auto" });
  }
}

renderActors();
sampleGrid.innerHTML = "";
sampleEmpty.hidden = false;
observeReveals();
showRoute();
window.addEventListener("hashchange", showRoute);
