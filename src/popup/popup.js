const toggle = document.getElementById('darkModeToggle');

// Load current state from storage on popup open
chrome.storage.local.get(['isDarkMode'], (result) => {
  // Default to true if not set
  const isDarkMode = result.isDarkMode !== undefined ? result.isDarkMode : true;
  toggle.checked = isDarkMode;
});

// Handle toggle change
toggle.addEventListener('change', async () => {
  const isDarkMode = toggle.checked;

  // Save state to storage
  chrome.storage.local.set({ isDarkMode });

  // Send message to active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      type: 'TOGGLE_THEME',
      isDarkMode
    });
  }
});
