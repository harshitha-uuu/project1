
/* ---------------- PAGE NAVIGATION ---------------- */

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
  }

  // auto close sidebar
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.remove("active");
  }
}

/* ---------------- SIDEBAR TOGGLE ---------------- */

function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.classList.toggle("active");
  }
}

/* ---------------- SAFE SLOGAN ROTATION ---------------- */

const slogans = [
  "Learn Smart, Build Future",
  "Stay Consistent, Stay Strong",
  "Small steps → Big success",
  "Focus today, shine tomorrow",
  "Knowledge is power",
  "Dream big, work hard",
  "Discipline creates success",
  "Never stop learning",
  "Push your limits",
  "You are capable"
];

let index = 0;

function rotateSlogans() {
  const el = document.getElementById("sloganText");

  if (!el) return;

  el.style.opacity = 0;

  setTimeout(() => {
    el.innerText = slogans[index];
    el.style.opacity = 1;

    index = (index + 1) % slogans.length;
  }, 400);
}

/* run every 5 seconds */
setInterval(rotateSlogans, 5000);

/* start safely after page load */
window.addEventListener("load", () => {
  rotateSlogans();
});
window.onload = rotate;
