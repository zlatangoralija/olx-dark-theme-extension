import '../styles/main.scss';

const DARK_MODE_CLASS = 'olx-dark-mode';

// Apply or remove dark mode class
function setDarkMode(enabled) {
  if (enabled) {
    document.documentElement.classList.add(DARK_MODE_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_MODE_CLASS);
  }
}

// Check system preference for dark mode
function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initialize dark mode on page load (runs at document_start)
function initDarkMode() {
  chrome.storage.local.get(['isDarkMode'], (result) => {
    let isDarkMode;

    if (result.isDarkMode !== undefined) {
      // Use stored preference
      isDarkMode = result.isDarkMode;
    } else {
      // Fall back to system preference
      isDarkMode = getSystemPreference();
      // Save the initial preference
      chrome.storage.local.set({ isDarkMode });
    }

    setDarkMode(isDarkMode);
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_THEME') {
    setDarkMode(message.isDarkMode);
  }
});

// Listen for system preference changes (for auto-detection)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only apply if user hasn't set a manual preference
  chrome.storage.local.get(['isDarkMode'], (result) => {
    if (result.isDarkMode === undefined) {
      setDarkMode(e.matches);
    }
  });
});

// Run immediately
initDarkMode();

console.log('OLX Dark Mode Active');
