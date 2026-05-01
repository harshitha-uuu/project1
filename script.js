
/* ================= PAGE SWITCH ================= */
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(p => p.classList.remove("active"));

  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");

  document.getElementById("sidebar").classList.remove("active");
}

/* ================= SIDEBAR ================= */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* ================= MOUSE GLOW (FIXED) ================= */
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (!glow) return;

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ================= SLOGANS ================= */
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

/* start slogans */
setInterval(rotateSlogans, 5000);

window.onload = rotateSlogans;
