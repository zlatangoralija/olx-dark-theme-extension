import '../styles/main.scss';
import darkLogo from '../assets/icons/logo.svg';

const DARK_MODE_CLASS = 'olx-dark-mode';
const ORIGINAL_LOGO_SRC = 'new-logo-olx';

// Apply or remove dark mode class
function setDarkMode(enabled) {
  if (enabled) {
    document.documentElement.classList.add(DARK_MODE_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_MODE_CLASS);
  }
  swapLogo(enabled);
}

// Swap OLX logo for dark mode variant
function swapLogo(enabled) {
  // Match any img.olx-logo that either has the original src OR was already swapped by us
  const logos = document.querySelectorAll('img.olx-logo');
  logos.forEach((logo) => {
    if (enabled) {
      if (!logo.dataset.originalSrc && logo.src.includes(ORIGINAL_LOGO_SRC)) {
        logo.dataset.originalSrc = logo.src;
      }
      if (logo.dataset.originalSrc) {
        logo.src = darkLogo;
      }
    } else if (logo.dataset.originalSrc) {
      logo.src = logo.dataset.originalSrc;
      delete logo.dataset.originalSrc;
    }
  });
}

// Observe DOM for late-loaded logos and swap them if dark mode is on
const logoObserver = new MutationObserver(() => {
  if (document.documentElement.classList.contains(DARK_MODE_CLASS)) {
    swapLogo(true);
  }
});
logoObserver.observe(document.documentElement, { childList: true, subtree: true });

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
