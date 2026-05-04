// ==========================================
// SUPABASE BACKEND CONFIGURATION
// ==========================================
const SUPABASE_URL = 'https://vwysldrdetcrnlgiexmh.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_QazNnNVIAJg1Iwy3sO-z5w_nJil4LvZ';

// Initialize the Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// PAGE ROUTING & UI SYSTEM
// ==========================================
function navigateTo(pageId) {
  console.log("Navigating to:", pageId); // Debugging helper
  
  // Close sidebar if open
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');

  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  } else {
    console.error("Page ID not found:", pageId);
  }

  // Handle specific page events
  if (pageId === 'notes') {
    showToast("Welcome to the Student Portal 👋");
    fetchNotes(); // Fetch real data from Supabase!
  } else if (pageId === 'home') {
    showToast("Logged out successfully");
  } else if (pageId === 'dashboard') {
    showToast("Admin access granted 🛡️");
  }
}

// Ensure functions are attached to the global window object so HTML buttons can see them
window.navigateTo = navigateTo;

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}
window.toggleSidebar = toggleSidebar;

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
window.toggleTheme = toggleTheme;

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// ==========================================
// REAL BACKEND FUNCTIONS (DATABASE & STORAGE)
// ==========================================

// 1. UPLOAD A NEW NOTE (Admin Dashboard)
async function triggerAction(actionType) {
  if (actionType === 'upload') {
    showToast("Uploading material... please wait ⏳");
    
    const titleInput = document.getElementById('upload-title');
    const subjectInput = document.getElementById('upload-subject');
    const descInput = document.getElementById('upload-desc');
    const fileInput = document.getElementById('upload-file');

    const title = titleInput.value.trim();
    const subject = subjectInput.value.trim();
    const description = descInput.value.trim();
    const file = fileInput.files[0];

    if (!title || !subject || !file) {
      showToast("❌ Please fill out all fields and select a file.");
      return;
    }

    try {
      // Step A: Upload PDF to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`; 
      const filePath = `materials/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('notes-files') 
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Step B: Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from('notes-files')
        .getPublicUrl(filePath);
      
      const fileUrl = publicUrlData.publicUrl;

      // Step C: Save to Database
      const { data: dbData, error: dbError } = await supabase
        .from('notes') 
        .insert([
          { title: title, subject: subject, description: description, file_url: fileUrl }
        ]);

      if (dbError) throw dbError;

      showToast("🚀 Material published successfully!");
      
      // Clear inputs
      titleInput.value = ''; subjectInput.value = ''; descInput.value = ''; fileInput.value = '';

    } catch (error) {
      console.error("Upload failed:", error);
      showToast("❌ Error uploading. Check console.");
    }
  }
}
window.triggerAction = triggerAction;

// 2. FETCH & DISPLAY NOTES (Student Portal)
async function fetchNotes() {
  const notesGrid = document.getElementById('notes-grid-container');
  if(!notesGrid) return;
  notesGrid.innerHTML = '<p>Loading notes from database...</p>';

  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      notesGrid.innerHTML = '<p>No notes published yet.</p>';
      return;
    }

    notesGrid.innerHTML = ''; // Clear loading text

    data.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card glass';
      card.innerHTML = `
        <div class="note-badge">${note.subject}</div>
        <h3>${note.title}</h3>
        <p>${note.description || 'No description provided.'}</p>
        <a href="${note.file_url}" target="_blank" style="text-decoration: none;">
          <button class="btn btn-outline full-width"><i class="fas fa-cloud-download-alt"></i> Download File</button>
        </a>
      `;
      notesGrid.appendChild(card);
    });

  } catch (error) {
    console.error("Fetch failed:", error);
    notesGrid.innerHTML = '<p>❌ Failed to load notes.</p>';
  }
}

// ==========================================
// CHATBOT & CURSOR
// ==========================================

const botKnowledge = {
  greetings: ["hello", "hi", "hey", "help", "start"],
  login: ["login", "sign in", "access", "account"],
  download: ["download", "get notes", "pdf", "read"],
  upload: ["upload", "admin", "publish", "add notes"]
};

function toggleChat() { 
  const chatWindow = document.getElementById('chatbot-window');
  if(chatWindow) chatWindow.classList.toggle('open'); 
}
window.toggleChat = toggleChat;

function handleChatEnter(event) { if (event.key === "Enter") sendMessage(); }
window.handleChatEnter = handleChatEnter;

function sendMessage() {
  const inputEl = document.getElementById('chat-input');
  const message = inputEl.value.trim();
  if (!message) return;
  addMessageToUI(message, 'user-message');
  inputEl.value = '';
  setTimeout(() => { generateBotResponse(message.toLowerCase()); }, 600);
}
window.sendMessage = sendMessage;

function generateBotResponse(msg) {
  let response = "I'm still learning! 🤔 You can ask me about **logging in**, **downloading notes**, or **admin access**.";
  if (botKnowledge.greetings.some(keyword => msg.includes(keyword))) response = "Hello there! 👋 I am the Campus Notes Hub Assistant. How can I guide you today?";
  else if (botKnowledge.login.some(keyword => msg.includes(keyword))) response = "To access materials, click 'Student Access' on the Home page and log in with your university email. 🎓";
  else if (botKnowledge.download.some(keyword => msg.includes(keyword))) response = "Once you log into the Student Portal, you can search for your subject and click the 'Download PDF' button! 📚";
  else if (botKnowledge.upload.some(keyword => msg.includes(keyword))) response = "Uploading is restricted to staff. Admins can log in via the 'Admin Access' portal. 🛡️";
  addMessageToUI(response, 'bot-message');
}

function addMessageToUI(text, className) {
  const chatBody = document.getElementById('chat-body');
  if(!chatBody) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  msgDiv.innerText = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Slogan Rotator
const slogans = [
  "Empowering your academic journey.", "Your digital campus library.",
  "Learn effectively, perform excellently.", "All your syllabus materials in one place."
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
  }
}, 4000);

// Mouse Cursor Glow
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
});
