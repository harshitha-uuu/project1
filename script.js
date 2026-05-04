function showPage(pageId) {
  showPopup("Loading...");

  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.remove("active"));

  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");

  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.remove("active");

  setTimeout(() => {
    showPopup("Opened Successfully ✅");
  }, 600);
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

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2500);
}

/* DOWNLOAD SUCCESS */
function downloadSuccess() {
  showPopup("Downloaded Successfully ✅");
}

/* UPLOAD SUCCESS */
function uploadSuccess() {
  showPopup("Uploaded Successfully ✅");
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

/* ================= CHATBOT ================= */
function toggleChatbot() {
  const chatbox = document.getElementById("chatbox");
  if (!chatbox) return;
  chatbox.classList.toggle("hidden");
}

function handleEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (!input || !chatMessages) return;

  const userText = input.value.trim();
  if (userText === "") return;

  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.innerText = userText;
  chatMessages.appendChild(userMsg);

  input.value = "";

  setTimeout(() => {
    const botReply = document.createElement("div");
    botReply.className = "bot-msg";
    botReply.innerText = getBotResponse(userText);
    chatMessages.appendChild(botReply);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* BOT ANSWERS */
function getBotResponse(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("download")) {
    return "📥 To download notes: Go to Notes Page → click Download button → you'll see a success popup.";
  }

  if (msg.includes("student login") || msg.includes("student")) {
    return "🎓 Student Login: Click Student Login on Home page → enter email/password → login to Notes Library.";
  }

  if (msg.includes("admin login") || msg.includes("admin")) {
    return "🛠️ Admin Login: Click Admin Login → enter admin credentials → upload notes in Admin Dashboard.";
  }

  if (msg.includes("upload")) {
    return "📤 Upload Notes: Open Admin Dashboard → fill details → choose file → click Upload → success popup will appear.";
  }

  if (msg.includes("menu")) {
    return "📌 Use the left menu button ☰ to open navigation. You can switch pages anytime.";
  }

  if (msg.includes("notes")) {
    return "📚 Notes Page contains available notes. Search option is available for future filtering.";
  }

  if (msg.includes("logout")) {
    return "🚪 Logout: Click Logout button to return back to Home page safely.";
  }

  if (msg.includes("what is this website") || msg.includes("purpose")) {
    return "🌟 Campus Notes Hub helps students easily access subject notes and allows admins to upload study materials.";
  }

  return "🤖 I can help you with: login, download, upload, menu navigation, notes access. Ask me like: 'How to download?'";
}
