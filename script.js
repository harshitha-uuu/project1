// --- PAGE ROUTING SYSTEM ---
function navigateTo(pageId) {
  // Hide sidebar if open
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');

  // Switch pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Dynamic greeting/toast
  if (pageId === 'home') {
    showToast("Logged out successfully");
  } else if (pageId === 'notes') {
    showToast("Welcome to the Student Portal 👋");
  } else if (pageId === 'dashboard') {
    showToast("Admin access granted 🛡️");
  }
  
  // Re-attach 3D tilt effect for new page elements
  setTimeout(initTiltEffect, 100);
}

// --- SIDEBAR TOGGLE ---
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

// --- THEME TOGGLE (DARK/LIGHT MODE) ---
function toggleTheme() {
  const body = document.body;
  const icon = document.querySelector('.theme-toggle i');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// --- TOAST NOTIFICATIONS ---
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Actions (Download/Upload)
function triggerAction(type) {
  if (type === 'download') {
    showToast("✅ Note downloaded successfully!");
  } else if (type === 'upload') {
    showToast("🚀 Material published successfully!");
    // Clear inputs visually
    document.querySelectorAll('#dashboard input, #dashboard textarea').forEach(el => el.value = '');
  }
}

// --- SMART CHATBOT SYSTEM ---
const botKnowledge = {
  greetings: ["hello", "hi", "hey", "help", "start"],
  login: ["login", "sign in", "access", "account"],
  download: ["download", "get notes", "pdf", "read"],
  upload: ["upload", "admin", "publish", "add notes"]
};

function toggleChat() {
  const chatWindow = document.getElementById('chatbot-window');
  chatWindow.classList.toggle('open');
}

function handleChatEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const message = inputEl.value.trim();
  if (!message) return;

  addMessageToUI(message, 'user-message');
  inputEl.value = '';

  // Simulate typing delay for bot
  setTimeout(() => {
    generateBotResponse(message.toLowerCase());
  }, 600);
}

function generateBotResponse(msg) {
  let response = "I'm still learning! 🤔 You can ask me about **logging in**, **downloading notes**, or **admin access**.";

  if (botKnowledge.greetings.some(keyword => msg.includes(keyword))) {
    response = "Hello there! 👋 I am the Campus Notes Hub Assistant. How can I guide you today?";
  } else if (botKnowledge.login.some(keyword => msg.includes(keyword))) {
    response = "To access materials, click 'Student Access' on the Home page and log in with your university email. 🎓";
  } else if (botKnowledge.download.some(keyword => msg.includes(keyword))) {
    response = "Once you log into the Student Portal, you can search for your subject and click the 'Download PDF' button on any note card! 📚";
  } else if (botKnowledge.upload.some(keyword => msg.includes(keyword))) {
    response = "Uploading is restricted to staff. Admins can log in via the 'Admin Access' portal to drag-and-drop new syllabus materials. 🛡️";
  }

  addMessageToUI(response, 'bot-message');
}

function addMessageToUI(text, className) {
  const chatBody = document.getElementById('chat-body');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  msgDiv.innerText = text;
  
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
}

// --- DYNAMIC SLOGANS ---
const slogans = [
  "Empowering your academic journey.",
  "Your digital campus library.",
  "Learn effectively, perform excellently.",
  "All your syllabus materials in one place."
];
let sloganIndex = 0;

setInterval(() => {
  const sloganEl = document.getElementById('dynamic-slogan');
  if (sloganEl) {
    sloganEl.style.opacity = 0;
    setTimeout(() => {
      sloganIndex = (sloganIndex + 1) % slogans.length;
      sloganEl.innerText = slogans[sloganIndex];
      sloganEl.style.opacity = 1;
    }, 400); 
    sloganEl.style.transition = "opacity 0.4s ease";
  }
}, 4000);

// --- 3D TILT EFFECT FOR CARDS ---
function initTiltEffect() {
  const cards = document.querySelectorAll('.auth-card, .note-card, .upload-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  });
}

// --- ELEGANT CURSOR GLOW SYSTEM ---
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
  if (!cursorGlow) return;
  // Use transform for high-performance smooth rendering
  cursorGlow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
});

document.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  if (cursorGlow) cursorGlow.style.opacity = '1';
});

// Initialize physics on first load
window.addEventListener('DOMContentLoaded', initTiltEffect);
