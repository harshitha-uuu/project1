
function showPage(id) {
  document.querySelectorAll(".page")
    .forEach(p => p.classList.remove("active"));

  document.getElementById(id).classList.add("active");

  document.getElementById("sidebar").classList.remove("active");
}

/* MENU */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* SLOGANS (SAFE LOOP) */
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

let i = 0;

function rotate() {
  const el = document.getElementById("sloganText");
  if (!el) return;

  el.innerText = slogans[i];
  i = (i + 1) % slogans.length;
}

setInterval(rotate, 5000);
window.onload = rotate;
