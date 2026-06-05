# louppian.github.io

개인 이력서 / 포트폴리오 웹사이트. GitHub Pages로 호스팅.

🔗 **https://louppian.github.io**

## 구조

| 파일 | 설명 |
|------|------|
| `index.html` | 이력서 본문 (내용 수정은 여기서) |
| `style.css` | 디자인 / 다크모드 색상 / 연도 타임라인 |
| `script.js` | 다크모드 토글, 연도 자동 표시 |

academic CV 스타일 — 가로 넓은 레이아웃에 **Experience / Publications / Certificates / Education**
섹션이 연도 거터(왼쪽 연도 + 오른쪽 내용) 타임라인으로 구성돼 있음. 각 섹션의 `.tl-row` 블록을
복사해서 항목을 추가하면 됨.

## 로컬에서 보기

브라우저로 `index.html`을 그냥 열면 됨. (별도 빌드 불필요)

## 수정 후 반영

```bash
git add .
git commit -m "이력서 내용 업데이트"
git push
```

push하면 1~2분 안에 https://louppian.github.io 에 자동 반영됨.

## PDF로 저장

브라우저에서 `Ctrl + P` → 대상을 "PDF로 저장" 선택. 인쇄용 스타일이 적용됨.
