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
let current = 0;
let animating = false;

function goTo(i) {
  current = Math.max(0, Math.min(slides.length - 1, i));
  animating = true;
  track.scrollTo({ left: current * track.clientWidth, behavior: "smooth" });
  setTimeout(() => (animating = false), 600);
  updateDots();
}

// 1) 휠 한 번 = 한 슬라이드 (긴 슬라이드는 세로로 끝까지 본 뒤 넘어감)
track.addEventListener(
  "wheel",
  (e) => {
    const slide = slides[current];
    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

    // 현재 슬라이드 내용이 화면보다 길면 그 안에서 세로 스크롤 우선
    const overflowing = slide.scrollHeight > slide.clientHeight + 2;
    if (overflowing) {
      const atTop = slide.scrollTop <= 0;
      const atBottom = slide.scrollTop + slide.clientHeight >= slide.scrollHeight - 1;
      if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
        return; // 세로 스크롤 허용
      }
    }

    e.preventDefault();
    if (animating || Math.abs(delta) < 6) return;
    goTo(current + (delta > 0 ? 1 : -1));
  },
  { passive: false }
);

// 2) 상단 메뉴(섹션 이름) 생성
const dots = document.createElement("nav");
dots.className = "dots";
dots.setAttribute("aria-label", "Sections");
slides.forEach((slide, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = slide.dataset.nav || "Section " + (i + 1);
  b.addEventListener("click", () => goTo(i));
  dots.appendChild(b);
});
document.body.appendChild(dots);
const dotEls = Array.from(dots.children);

function updateDots() {
  dotEls.forEach((d, i) => d.classList.toggle("active", i === current));
}
updateDots();

// 3) 트랙패드 가로 스와이프/스크롤바로 움직였을 때 현재 인덱스 동기화
track.addEventListener(
  "scroll",
  () => {
    if (animating) return;
    current = Math.round(track.scrollLeft / track.clientWidth);
    updateDots();
  },
  { passive: true }
);

// 4) 키보드 좌우 화살표
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});

// 5) 창 크기 변경 시 현재 슬라이드 위치 보정
window.addEventListener("resize", () => {
  track.scrollTo({ left: current * track.clientWidth });
});
