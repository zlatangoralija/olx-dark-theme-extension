import '../styles/main.scss';
import darkLogoUrl from '../assets/icons/logo.svg';

// The bundler emits a root-absolute path ("/assets/logo-<hash>.svg"). Assigned to
// img.src inside a content script it would resolve against the PAGE's origin
// (https://pik.ba/assets/...) and 404. Resolve it against the extension instead.
const darkLogo = chrome.runtime.getURL(darkLogoUrl);

const DARK_MODE_CLASS = 'olx-dark-mode';
// pik.ba serves /img/pik-logo.svg; olx.ba legacy pages still serve new-logo-olx.*
const ORIGINAL_LOGO_SRCS = ['pik-logo', 'new-logo-olx'];

// Apply or remove dark mode class
function setDarkMode(enabled) {
  if (enabled) {
    document.documentElement.classList.add(DARK_MODE_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_MODE_CLASS);
  }
  swapLogo(enabled);
}

// Swap the site logo for the dark mode variant
function swapLogo(enabled) {
  // Match any site logo that either has the original src OR was already swapped by us.
  // pik.ba still uses the legacy .olx-logo class on its header/form logos.
  const logos = document.querySelectorAll('img.olx-logo, img.pik-logo');
  logos.forEach((logo) => {
    if (enabled) {
      if (!logo.dataset.originalSrc && ORIGINAL_LOGO_SRCS.some((src) => logo.src.includes(src))) {
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
