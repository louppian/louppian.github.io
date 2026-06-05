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

// ===== 가로 슬라이드 =====
const track = document.querySelector(".resume");
const slides = Array.from(track.querySelectorAll(".snap"));

// 1) 마우스 세로 휠 → 가로 스크롤 (트랙패드 가로 스와이프는 기본 동작 유지)
track.addEventListener(
  "wheel",
  (e) => {
    // 슬라이드 내부가 세로로 넘칠 때는 내부 스크롤 우선
    const slide = e.target.closest(".snap");
    const canScrollVert = slide && slide.scrollHeight > slide.clientHeight;
    if (canScrollVert) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      track.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  },
  { passive: false }
);

// 2) 위치 표시용 점(dots) 생성
const dots = document.createElement("nav");
dots.className = "dots";
dots.setAttribute("aria-label", "Section indicator");
slides.forEach((slide, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("aria-label", "Go to section " + (i + 1));
  b.addEventListener("click", () => {
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  });
  dots.appendChild(b);
});
document.body.appendChild(dots);
const dotEls = Array.from(dots.children);

// 3) 스크롤에 따라 현재 슬라이드 점 강조
function updateDots() {
  const idx = Math.round(track.scrollLeft / track.clientWidth);
  dotEls.forEach((d, i) => d.classList.toggle("active", i === idx));
}
track.addEventListener("scroll", updateDots, { passive: true });
updateDots();

// 4) 키보드 좌우 화살표로도 이동
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  if (e.key === "ArrowLeft") track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
});
