// 현재 연도 자동 표시
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 다크모드 토글 (선택값 localStorage 저장) =====
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const saved = localStorage.getItem("theme");
if (saved) {
  root.setAttribute("data-theme", saved);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.setAttribute("data-theme", "dark");
}
updateIcon();

toggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateIcon();
});

function updateIcon() {
  const isDark = root.getAttribute("data-theme") === "dark";
  toggle.textContent = isDark ? "☀️" : "🌙";
}

// ===== 탭 전환 =====
const tabs = Array.from(document.querySelectorAll(".tab"));
const panels = Array.from(document.querySelectorAll(".panel"));

function showTab(id) {
  tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.tab === id)));
  panels.forEach((p) => (p.hidden = p.id !== id));
  if (history.replaceState) history.replaceState(null, "", "#" + id);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

// URL 해시(#publications 등)로 들어오면 해당 탭 열기
const initial = location.hash.replace("#", "");
if (initial && tabs.some((t) => t.dataset.tab === initial)) {
  showTab(initial);
}
