document.addEventListener('DOMContentLoaded', () => {
  // --- STATE MANAGEMENT ---
  const state = {
    user: null,
    videoFile: null,
    generatedScript: '',
    subtitles: {
      font: 'Inter',
      size: '24',
      color: '#FFE600',
      bg: '#000000'
    }
  };

  // --- DOM ELEMENTS ---
  const authContainer = document.getElementById('auth-container');
  const appContainer = document.getElementById('app-container');
  const loginForm = document.getElementById('login-form');
  const logoutBtn = document.getElementById('logout-btn');
  const displayUser = document.getElementById('display-user');

  const videoInput = document.getElementById('video-input');
  const dropzone = document.getElementById('dropzone');
  const dropzoneContent = document.getElementById('dropzone-content');
  const previewContainer = document.getElementById('preview-container');
  const videoPlayer = document.getElementById('video-player');
  const removeVideoBtn = document.getElementById('remove-video-btn');
  const videoStatus = document.getElementById('video-status');

  const generateScriptBtn = document.getElementById('generate-script-btn');
  const scriptStyle = document.getElementById('script-style');
  const scriptEditor = document.getElementById('script-editor');
  const copyScriptBtn = document.getElementById('copy-script-btn');

  const subFont = document.getElementById('sub-font');
  const subSize = document.getElementById('sub-size');
  const subColor = document.getElementById('sub-color');
  const subBg = document.getElementById('sub-bg');
  const subPreviewText = document.getElementById('subtitle-preview-text');

  const exportSrtBtn = document.getElementById('export-srt-btn');
  const exportVideoBtn = document.getElementById('export-video-btn');
  const loadingModal = document.getElementById('loading-modal');
  const modalStatusText = document.getElementById('modal-status-text');

  // --- AUTHENTICATION LOGIC ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    // Simulate successful login
    state.user = email.split('@')[0];
    displayUser.textContent = state.user;

    authContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');
  });

  logoutBtn.addEventListener('click', () => {
    state.user = null;
    appContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
  });

  // --- VIDEO UPLOAD & DRAG/DROP LOGIC ---
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleVideoSelect(e.dataTransfer.files[0]);
    }
  });

  videoInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleVideoSelect(e.target.files[0]);
    }
  });

  function handleVideoSelect(file) {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file format.');
      return;
    }
    state.videoFile = file;
    const url = URL.createObjectURL(file);
    videoPlayer.src = url;

    dropzoneContent.classList.add('hidden');
    previewContainer.classList.remove('hidden');
    
    videoStatus.textContent = "Ready to Process";
    videoStatus.classList.add('active');
    
    generateScriptBtn.disabled = false;
    exportVideoBtn.disabled = false;
  }

  removeVideoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    state.videoFile = null;
    videoPlayer.src = "";
    previewContainer.classList.add('hidden');
    dropzoneContent.classList.remove('hidden');
    
    videoStatus.textContent = "No File Loaded";
    videoStatus.classList.remove('active');
    
    generateScriptBtn.disabled = true;
    exportVideoBtn.disabled = true;
    videoInput.value = "";
  });

  // --- AI SCRIPT GENERATION (SIMULATION) ---
  const MOCK_SCRIPTS = {
    dramatic: "In a world built on secrets, our protagonist discovers a hidden truth buried deep within the facility. Tensions reach a breaking point when time completely runs out...",
    fast: "A total classic! He enters the room, grabs the artifact, and dodges three security traps in under five seconds. Look at this maneuver!",
    humorous: "So this guy decides it's a brilliant idea to walk straight into the villain's secret lair without a plan. Predictably, things fall apart immediately.",
    detailed: "The second act initiates with a critical shift in narrative focus. Main character confrontation highlights the overarching conflict surrounding the artifact."
  };

  generateScriptBtn.addEventListener('click', () => {
    showLoadingModal("Analyzing keyframes & speech tracks...");

    setTimeout(() => {
      modalStatusText.textContent = "Drafting recap narration...";
    }, 1500);

    setTimeout(() => {
      hideLoadingModal();
      const style = scriptStyle.value;
      state.generatedScript = MOCK_SCRIPTS[style] || MOCK_SCRIPTS.dramatic;
      scriptEditor.value = state.generatedScript;
    }, 3000);
  });

  copyScriptBtn.addEventListener('click', () => {
    if (!scriptEditor.value) return;
    navigator.clipboard.writeText(scriptEditor.value);
    
    const originalText = copyScriptBtn.innerHTML;
    copyScriptBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    setTimeout(() => {
      copyScriptBtn.innerHTML = originalText;
    }, 2000);
  });

  // --- SUBTITLE CUSTOMIZATION LOGIC ---
  function updateSubtitlePreview() {
    state.subtitles.font = subFont.value;
    state.subtitles.size = subSize.value;
    state.subtitles.color = subColor.value;
    state.subtitles.bg = subBg.value;

    subPreviewText.style.fontFamily = state.subtitles.font;
    subPreviewText.style.fontSize = `${state.subtitles.size}px`;
    subPreviewText.style.color = state.subtitles.color;
    subPreviewText.style.backgroundColor = state.subtitles.bg;
  }

  subFont.addEventListener('change', updateSubtitlePreview);
  subSize.addEventListener('input', updateSubtitlePreview);
  subColor.addEventListener('input', updateSubtitlePreview);
  subBg.addEventListener('input', updateSubtitlePreview);

  // Initialize preview on load
  updateSubtitlePreview();

  // --- EXPORT FUNCTIONALITY ---
  exportSrtBtn.addEventListener('click', () => {
    if (!scriptEditor.value) {
      alert("Please generate or enter a script first.");
      return;
    }

    const srtContent = `1\n00:00:01,000 --> 00:00:04,000\n${scriptEditor.value}`;
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movie_recap_subtitles.srt';
    a.click();
    URL.revokeObjectURL(url);
  });

  exportVideoBtn.addEventListener('click', () => {
    showLoadingModal("Rendering final video with burned-in subtitles...");

    setTimeout(() => {
      hideLoadingModal();
      alert("Export complete! Your movie recap video has been downloaded.");
    }, 3500);
  });

  // --- UTILS ---
  function showLoadingModal(text) {
    modalStatusText.textContent = text;
    loadingModal.classList.remove('hidden');
  }

  function hideLoadingModal() {
    loadingModal.classList.add('hidden');
  }
});