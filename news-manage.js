const form = document.getElementById("news-form");
const list = document.getElementById("news-manage-list");
const resultBox = document.getElementById("news-result");
const editorTitle = document.getElementById("news-editor-title");
const reloadButton = document.getElementById("news-reload");
const resetButton = document.getElementById("news-reset");

let articles = [];

function escapeHtml(value = "") {
  return `${value}`.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function authToken() {
  return localStorage.getItem("chipsAuthToken") || "";
}

function authHeaders(extra = {}) {
  const token = authToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : extra;
}

function cachedUser() {
  try {
    return JSON.parse(localStorage.getItem("chipsAuthUser") || "null");
  } catch {
    return null;
  }
}

async function currentUser() {
  const cached = cachedUser();
  if (!authToken()) return cached;
  try {
    const response = await fetch("/api/auth/me", { headers: authHeaders(), cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Auth check failed");
    localStorage.setItem("chipsAuthUser", JSON.stringify(payload.user));
    return payload.user;
  } catch {
    return cached;
  }
}

function renderAuthStatus(user) {
  document.querySelectorAll("[data-auth-nav]").forEach((nav) => {
    nav.hidden = !user || user.role !== "admin";
  });
  document.querySelectorAll("[data-auth-greeting]").forEach((greeting) => {
    greeting.hidden = !user;
    if (user) {
      greeting.innerHTML = `<span><strong>${escapeHtml(user.name || user.username)}</strong>님 반갑습니다.</span><button type="button" data-news-logout>로그아웃</button>`;
    }
  });

  if (!user || user.role !== "admin") {
    document.querySelector(".submission-hero").insertAdjacentHTML(
      "afterend",
      `<section class="login-gate form-section">
        <p class="submission-kicker">ADMIN ONLY</p>
        <h1>관리자 로그인이 필요합니다</h1>
        <p>뉴스 작성과 수정은 관리자 계정으로 로그인한 뒤 사용할 수 있습니다.</p>
        <div class="form-actions compact-actions"><a class="primary-button button-link" href="login.html">로그인</a></div>
      </section>`,
    );
    document.querySelectorAll(".news-editor-section, .form-section:not(.login-gate)").forEach((section) => {
      if (!section.classList.contains("login-gate")) section.hidden = true;
    });
    return;
  }

  document.querySelector("[data-news-logout]")?.addEventListener("click", async () => {
    await fetch("/api/auth/logout", { method: "POST", headers: authHeaders() }).catch(() => {});
    localStorage.removeItem("chipsAuthToken");
    localStorage.removeItem("chipsAuthUser");
    window.location.href = "login.html";
  });
}

function showResult(payload) {
  resultBox.hidden = false;
  resultBox.textContent = typeof payload === "string" ? payload : JSON.stringify(payload, null, 2);
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function bodyText(article) {
  return Array.isArray(article.body) ? article.body.join("\n") : `${article.body || ""}`;
}

function categoryText(article) {
  return Array.isArray(article.categories) ? article.categories.join(", ") : `${article.categories || article.category || ""}`;
}

function resetForm() {
  form.reset();
  document.getElementById("news-id").value = "";
  document.getElementById("news-date").value = today();
  editorTitle.textContent = "새 뉴스 작성";
  form.querySelector(".primary-button").textContent = "뉴스 저장";
}

function editArticle(id) {
  const article = articles.find((item) => item.id === id);
  if (!article) return;
  document.getElementById("news-id").value = article.id;
  document.getElementById("news-title").value = article.title || "";
  document.getElementById("news-date").value = article.datetime || "";
  document.getElementById("news-lead").value = article.lead || "";
  document.getElementById("news-categories").value = categoryText(article);
  document.getElementById("news-image").value = article.image || "";
  document.getElementById("news-image-file").value = "";
  document.getElementById("news-body").value = bodyText(article);
  editorTitle.textContent = "뉴스 수정";
  form.querySelector(".primary-button").textContent = "수정 저장";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function deleteArticle(id) {
  const article = articles.find((item) => item.id === id);
  if (!article) return;
  if (!confirm(`'${article.title}' 뉴스를 삭제할까요?`)) return;
  const data = new FormData();
  data.set("action", "delete");
  data.set("id", id);
  const response = await fetch("/api/admin/news", {
    method: "POST",
    headers: authHeaders(),
    body: data,
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "뉴스 삭제에 실패했습니다.");
  articles = payload.newsArticles || [];
  renderList();
  resetForm();
  showResult({ ok: true, message: "뉴스가 삭제되었습니다." });
}

function renderList() {
  if (!articles.length) {
    list.innerHTML = `<p class="form-help">아직 등록된 뉴스가 없습니다.</p>`;
    return;
  }
  list.innerHTML = articles
    .map(
      (article) => `
        <article class="news-manage-card">
          <img src="${escapeHtml(article.image || "assets/chips-hero-optimized.webp")}" alt="" />
          <div>
            <div class="news-manage-meta">
              <time>${escapeHtml(article.date || article.datetime || "")}</time>
              <span>${escapeHtml(categoryText(article))}</span>
            </div>
            <h3>${escapeHtml(article.title)}</h3>
            <p>${escapeHtml(article.lead)}</p>
          </div>
          <div class="news-manage-actions">
            <button class="secondary-button" type="button" data-news-edit="${escapeHtml(article.id)}">수정</button>
            <button class="danger-button" type="button" data-news-delete="${escapeHtml(article.id)}">삭제</button>
          </div>
        </article>
      `,
    )
    .join("");
}

async function loadNews() {
  list.innerHTML = `<p class="form-help">뉴스 목록을 불러오는 중입니다.</p>`;
  const response = await fetch("/api/admin/news", { headers: authHeaders(), cache: "no-store" });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "뉴스 목록을 불러오지 못했습니다.");
  articles = payload.newsArticles || [];
  renderList();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const response = await fetch("/api/admin/news", {
    method: "POST",
    headers: authHeaders(),
    body: data,
  });
  const payload = await response.json();
  if (!response.ok) {
    showResult(payload);
    return;
  }
  articles = payload.newsArticles || [];
  renderList();
  resetForm();
  showResult({ ok: true, message: "뉴스가 저장되었습니다.", article: payload.article });
});

list.addEventListener("click", async (event) => {
  const editButton = event.target.closest("[data-news-edit]");
  if (editButton) {
    editArticle(editButton.dataset.newsEdit);
    return;
  }
  const deleteButton = event.target.closest("[data-news-delete]");
  if (deleteButton) {
    try {
      await deleteArticle(deleteButton.dataset.newsDelete);
    } catch (error) {
      showResult({ error: error.message });
    }
  }
});

reloadButton.addEventListener("click", () => {
  loadNews().catch((error) => showResult({ error: error.message }));
});
resetButton.addEventListener("click", resetForm);
form.addEventListener("reset", () => window.setTimeout(resetForm, 0));

currentUser().then((user) => {
  renderAuthStatus(user);
  resetForm();
  if (user?.role === "admin") loadNews().catch((error) => showResult({ error: error.message }));
});
