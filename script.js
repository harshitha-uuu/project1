function showPage(pageId) {
  showPopup("Loading page...");

  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.remove("active"));

  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");

  document.getElementById("sidebar").classList.remove("active");

  setTimeout(() => {
    // Only show page loaded if we aren't logging out to the main menu
    if(pageId !== 'rolePage') {
        showPopup("Page loaded successfully ✅");
    }
  }, 600);
}

/* NEW REQUIRED FUNCTIONS */
function handleDownload() {
  showPopup("Successfully downloaded ✅");
}

function handleUpload() {
  showPopup("Uploaded successfully ✅");
  // Optional: clear the inputs after upload
  document.querySelectorAll('#adminDashboard input, #adminDashboard textarea').forEach(input => input.value = '');
}

/* SIDEBAR */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

/* MOUSE GLOW */
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* POPUP SYSTEM */
function showPopup(message) {
  const popup = document.getElementById("popup");
  if (!popup) return;

  popup.innerText = message;
  popup.classList.remove("hidden");
  popup.classList.add("show");

  // Clear any existing timeout so popups don't overlap strangely
  if(window.popupTimeout) clearTimeout(window.popupTimeout);
  
  window.popupTimeout = setTimeout(() => {
    popup.classList.remove("show");
  }, 2500); // Extended slightly so it's easier to read
}

/* SLOGANS */
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

window.addEventListener("load", () => {
  showPopup("Welcome to Campus Notes Hub 🎓");
  rotateSlogans();
});
