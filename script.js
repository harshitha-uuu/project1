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
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.innerText = getBotResponse(userText);
    chatMessages.appendChild(botMsg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* BOT ANSWERS */
function getBotResponse(msg) {
  msg = msg.toLowerCase();

  if (msg === "hi" || msg === "hello") {
    return "Hello 👋 Welcome to Campus Notes Hub! How can I help you today?";
  }

  if (msg.includes("download")) {
    return "📥 To download notes: Open Notes Page → click Download button → success popup will appear.";
  }

  if (msg.includes("student login") || msg.includes("student")) {
    return "🎓 Student Login: Click Student Login on Home page → enter details → Login → access Notes Library.";
  }

  if (msg.includes("admin login") || msg.includes("admin")) {
    return "🛠️ Admin Login: Click Admin Login → enter admin credentials → upload notes using Admin Dashboard.";
  }

  if (msg.includes("upload")) {
    return "📤 Upload Notes: Go to Admin Dashboard → fill title & subject → select file → click Upload.";
  }

  if (msg.includes("menu")) {
    return "📌 Use ☰ menu button on top-left to open sidebar and navigate pages easily.";
  }

  if (msg.includes("logout")) {
    return "🚪 Click Logout button to return to the Home page.";
  }

  if (msg.includes("purpose") || msg.includes("what is this website")) {
    return "🌟 Campus Notes Hub is built for students to download study notes and for admins to upload resources.";
  }

  return "🤖 I can help with: login, download, upload, notes, menu navigation. Ask me like: 'How to download notes?'";
}
