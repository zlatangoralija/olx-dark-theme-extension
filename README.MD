# OLX.ba Dark Mode

A browser extension that brings a carefully crafted dark theme to [olx.ba](https://olx.ba) — Bosnia and Herzegovina's largest online marketplace. Browse listings, manage your profile, publish ads, and explore every page with a modern dark interface that's easy on the eyes.

![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?logo=firefox&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Privacy & Security](#privacy--security)
- [Disclaimer](#disclaimer)
- [Technical Details](#technical-details)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Building for Production](#building-for-production)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Full dark theme** covering all major OLX.ba pages:
  - Homepage and listing feeds
  - Search results and filters
  - Individual listing pages
  - User and shop profiles
  - Publish/edit listing flow (forms, category pickers, modals)
  - Messaging and conversations
  - Static pages (About, Terms of Use, Privacy, Online Security, OLX Delivery, OLX Credit)
  - Header, footer, navigation, and all modals
- **One-click toggle** via the extension popup — switch between dark and light mode instantly
- **System preference detection** — automatically follows your OS dark mode setting on first install
- **Persistent preference** — your choice is saved across sessions and browser restarts
- **Instant activation** — styles are injected at `document_start` to prevent white flash on page load
- **Lightweight** — no external libraries, no background processes, minimal resource usage

## Installation

### Google Chrome / Chromium-based browsers (Edge, Brave, Arc, Opera)

<!-- TODO: Replace with actual Chrome Web Store link -->
1. Visit the [Chrome Web Store listing](#)
2. Click **"Add to Chrome"**
3. Confirm by clicking **"Add Extension"**

### Mozilla Firefox

<!-- TODO: Replace with actual Firefox Add-on link -->
1. Visit the [Firefox Add-ons listing](https://addons.mozilla.org/en-US/firefox/addon/olx-ba-dark-tema/)
2. Click **"Add to Firefox"**
3. Confirm by clicking **"Add"**

### Apple Safari

<!-- TODO: Replace with actual Safari extension link -->
1. Visit the [Safari Extension listing](#)
2. Click **"Get"** and follow the installation prompts

### Manual Installation (for developers)

If you'd like to load the extension manually from source:

1. Clone this repository:
   ```bash
   git clone https://github.com/zlatangoralija/olx-dark-theme-extension.git
   cd olx-dark-theme-extension
   ```

2. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```

3. Load in Chrome:
   - Navigate to `chrome://extensions/`
   - Enable **"Developer mode"** (top right)
   - Click **"Load unpacked"**
   - Select the `dist` folder from the project

4. Load in Firefox:
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Click **"Load Temporary Add-on"**
   - Select the `manifest.json` file from the `dist` folder

## How to Use

1. After installation, you'll see the OLX Dark Mode icon in your browser toolbar
2. Navigate to any page on [olx.ba](https://olx.ba)
3. Click the extension icon to open the popup
4. Toggle the switch to enable or disable dark mode
5. Your preference is saved automatically — it will persist across tabs and sessions

> **Tip:** If you have dark mode enabled at the OS level, the extension will automatically activate dark mode on first install without any action needed.

## Privacy & Security

**Your privacy matters. This extension is built with a strict privacy-first approach:**

- **No data collection** — the extension does not collect, store, transmit, or share any personal data whatsoever
- **No tracking** — there are no analytics, telemetry, tracking pixels, or any form of usage monitoring
- **No ads** — the extension contains no advertisements and never will
- **No network requests** — the extension makes zero external network calls. It operates entirely locally within your browser
- **No third-party scripts** — all code is first-party. There are no external dependencies loaded at runtime
- **Minimal permissions** — the extension only requests the permissions it absolutely needs:
  - `storage` — to save your dark mode on/off preference locally
  - `activeTab` — to apply the theme to the current OLX.ba tab
  - `scripting` — to inject the dark mode stylesheet
- **Host permissions** are restricted exclusively to `https://*.olx.ba/*` — the extension cannot access or interact with any other website
- **Open source** — the entire source code is publicly available for inspection in this repository

## Disclaimer

> **This extension is NOT an official product of OLX.ba or its parent company.** It is an independent, community-driven project created to enhance the browsing experience for OLX.ba users. It is not affiliated with, endorsed by, or in any way officially connected to OLX.ba, OLX Group, or any of their subsidiaries. The OLX name and logo are trademarks of their respective owners.

---

## Technical Details

### Tech Stack

| Technology | Purpose |
|---|---|
| **Chrome Extension Manifest V3** | Extension platform and API |
| **Vite 5** | Build tool and dev server |
| **@crxjs/vite-plugin** | Chrome extension Vite integration (HMR support during development) |
| **SCSS (Sass)** | Stylesheet authoring with variables, nesting, and modularity |
| **Vanilla JavaScript (ES Modules)** | Content script and popup logic — no frameworks |

### Browser Compatibility

| Browser | Status    |
|---|-----------|
| Google Chrome 88+ | Supported |
| Microsoft Edge 88+ | Supported |
| Brave | Supported |
| Arc | Supported |
| Opera | Supported |
| Mozilla Firefox | Supported |
| Apple Safari | Supported |

## Project Structure

```
olx-dark-theme-extension/
├── manifest.json              # Extension manifest (MV3)
├── package.json               # Node.js dependencies and scripts
├── vite.config.js             # Vite build configuration with CRXJS plugin
├── src/
│   ├── assets/
│   │   └── icons/
│   │       ├── icon16.png     # Extension icon (16x16)
│   │       ├── icon32.png     # Extension icon (32x32)
│   │       ├── icon48.png     # Extension icon (48x48)
│   │       ├── icon128.png    # Extension icon (128x128)
│   │       └── logo.svg       # Dark mode OLX logo (teal variant)
│   ├── popup/
│   │   ├── popup.html         # Extension popup UI
│   │   ├── popup.css          # Popup styles
│   │   └── popup.js           # Popup toggle logic
│   ├── scripts/
│   │   └── content.js         # Content script (theme injection + logo swap)
│   └── styles/
│       ├── _variables.scss    # SCSS color palette and design tokens
│       └── main.scss          # All dark mode overrides (~7900+ rules)
└── dist/                      # Built extension output (git-ignored)
```

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zlatangoralija/olx-dark-theme-extension.git
   cd olx-dark-theme-extension
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   This starts Vite with the CRXJS plugin, enabling **hot module replacement (HMR)** — SCSS changes are reflected instantly without reloading the extension.

4. **Load the extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **"Load unpacked"**
   - Select the project root directory (not `dist` — CRXJS handles this during development)

5. **Open any page on olx.ba** and you should see the dark theme in action.

### Development Workflow

- Edit SCSS files in `src/styles/` — changes apply via HMR in real-time
- Edit `content.js` — the extension reloads automatically
- Edit `popup.html/css/js` — close and reopen the popup to see changes
- Use your browser's DevTools to inspect elements and find class names to style

## Building for Production

```bash
npm run build
```

This outputs the production-ready extension to the `dist/` folder with:
- Compiled and minified CSS (from SCSS)
- Bundled JavaScript
- Copied static assets and manifest
- Inlined small SVGs as data URIs

The `dist/` folder can be zipped and uploaded directly to the Chrome Web Store, Firefox Add-ons, or any Chromium-based extension store.

## How It Works

### Architecture Overview

The extension uses a simple but effective architecture with three main components:

#### 1. Content Script (`src/scripts/content.js`)

The content script is the core of the extension. It runs on every OLX.ba page at `document_start` (before the DOM is rendered) and is responsible for:

- **Theme application:** Adds or removes the `olx-dark-mode` class on the `<html>` element based on the user's stored preference
- **Preference management:** Reads from and writes to `chrome.storage.local` to persist the user's dark/light mode choice
- **System preference detection:** On first install (no stored preference), checks `prefers-color-scheme: dark` to automatically match the user's OS setting
- **Logo replacement:** Dynamically swaps the OLX logo with a dark-mode-optimized teal SVG variant. Uses a `MutationObserver` to catch late-loaded logos on SPA-style page transitions
- **Message handling:** Listens for `TOGGLE_THEME` messages from the popup to apply changes in real-time

#### 2. Stylesheet (`src/styles/main.scss`)

All dark mode visual overrides live in a single SCSS file (~7900+ lines), organized by page/component section. Key design decisions:

- **Scoped under `html.olx-dark-mode`** — all rules are nested under this selector, ensuring zero impact when dark mode is off
- **`!important` on all declarations** — necessary to override OLX.ba's inline styles and high-specificity selectors
- **CSS custom properties** for consistent theming:
  - `--bg-main: #121212` — primary background
  - `--bg-card: #1E1E1E` — card/panel background
  - `--bg-elevated: #2D2D2D` — elevated surfaces (dropdowns, modals)
  - `--text-main: #E4E6EB` — primary text
  - `--text-muted: #B0B3B8` — secondary/muted text
  - `--border-color: #2F3336` — borders and dividers
  - `--accent-primary: #4DB6AC` — teal accent (links, active states)
  - `--accent-hover: #80CBC4` — lighter teal for hover states
- **Filter techniques** for icon handling:
  - `filter: brightness(0) invert(1)` for SVG icons (makes them white)
  - Solid background wrappers for raster/PNG icons that can't be inverted
  - `filter: brightness(1.8) saturate(1.5)` to lighten colored icons without hue shifting

#### 3. Popup (`src/popup/`)

A minimal popup UI built with plain HTML, CSS, and JavaScript:

- Displays the OLX Dark Mode branding and a toggle switch
- Reads the current theme state from `chrome.storage.local`
- On toggle, saves the new state and sends a message to the active tab's content script
- Includes feedback links (email, Google Form, GitHub Issues)

### Data Flow

```
User clicks toggle in popup
        │
        ▼
popup.js saves preference to chrome.storage.local
        │
        ▼
popup.js sends TOGGLE_THEME message to active tab
        │
        ▼
content.js receives message
        │
        ▼
content.js adds/removes 'olx-dark-mode' class on <html>
        │
        ▼
CSS rules under html.olx-dark-mode activate/deactivate
        │
        ▼
Logo is swapped to dark variant (or reverted to original)
```

## Contributing

Contributions are welcome! Whether it's a bug fix, a new page that needs dark mode support, or an improvement to existing styles — all help is appreciated.

### How to Contribute

1. **Fork** the repository
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** — follow the existing code style and patterns
4. **Test thoroughly:**
   - Load the extension locally and verify your changes on olx.ba
   - Test with dark mode both enabled and disabled
   - Check that toggling works correctly
   - Verify no visual regressions on other pages
5. **Commit your changes:**
   ```bash
   git commit -m "feat: description of your change"
   ```
6. **Push and create a Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a PR against the `main` branch.

### Contribution Guidelines

- **SCSS organization:** Add new styles to the appropriate section in `main.scss`. Each section is clearly marked with comment headers (e.g., `// HEADER / NAVBAR`, `// LISTING CARDS`, `// STATIC PAGES`)
- **Always scope under `html.olx-dark-mode`** — never add unscoped global styles
- **Use `!important`** on all declarations — this is required to override OLX.ba's styles
- **Use CSS custom properties** (`var(--bg-card)`, `var(--text-main)`, etc.) for colors — don't hardcode hex values unless necessary
- **Test both states** — make sure pages look correct with dark mode on AND off
- **Keep it minimal** — only style what needs to be styled. Don't add unnecessary overrides

### Reporting Bugs

If you find a page or component that doesn't look right in dark mode:

1. **Open an issue** on [GitHub Issues](https://github.com/zlatangoralija/olx-dark-theme-extension/issues)
2. Include:
   - The URL of the page
   - A screenshot showing the issue
   - The element's class name(s) if possible (use browser DevTools)
3. Alternatively, use the feedback links in the extension popup (Email or Google Form)

## License

This project is licensed under the **MIT License** — see below for the full text.

```
MIT License

Copyright (c) 2025 Zlatan Goralija

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Made with care for the OLX.ba community by [Zlatan Goralija](https://github.com/zlatangoralija)**
