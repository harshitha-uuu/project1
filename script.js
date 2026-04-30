function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(p => p.classList.remove("active"));

  document.getElementById(pageId).classList.add("active");

  document.getElementById("sidebar").classList.remove("active");
}

/* SIDEBAR */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* MOUSE GLOW */
let x = 0;
let y = 0;

document.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
});

setInterval(() => {
  document.body.style.background = `
    radial-gradient(circle at ${x}px ${y}px,
    rgba(108,43,217,0.18),
    #ffffff 70%)
  `;
}, 35);

/* SLOGANS (10 LOOP) */

const slogans = [
  "📘 Learn Smart. Build Future.",
  "💡 Small steps lead to big success.",
  "🚀 Stay consistent, stay strong.",
  "🔥 Push yourself beyond limits.",
  "📚 Knowledge is power.",
  "🎯 Focus today, succeed tomorrow.",
  "🏆 Excellence is a habit.",
  "🧠 Train your mind daily.",
  "⚡ Dream big, work hard.",
  "🌟 Every expert was once a beginner."
];

let i = 0;

function rotateSlogans() {
  const el = document.getElementById("sloganText");
  if (!el) return;

  el.style.opacity = 0;

  setTimeout(() => {
    el.innerText = slogans[i];
    el.style.opacity = 1;
    i = (i + 1) % slogans.length;
  }, 500);
}

setInterval(rotateSlogans, 5000);
window.onload = rotateSlogans;
