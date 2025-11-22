# 🦖 Devosaurus

**TypeScript library for voice-controlling web applications**

Devosaurus is a library designed to control your web application using voice recognition via the Web Speech API. It includes ready-to-use presets for common tasks and robust support for custom commands.

## 📋 Features

  * ✨ **Voice Recognition:** Cross-browser support (Chrome, Edge) via Web Speech API.
  * 🎯 **Built-in Presets:** Pre-defined actions for DOM manipulation, navigation, forms, and more.
  * 🎨 **Visual UI:** Floating badge with real-time feedback and status indicators.
  * 🔧 **Custom Commands:** Full support for async functions and custom triggers.
  * 🌐 **Locale Config:** Configurable language support (defaults to Spanish `es-ES`).
  * 📦 **Hybrid Package:** Supports both CJS and ESM formats for maximum compatibility.

## 🚀 Installation

```bash
npm install devosaurus
# or
yarn add devosaurus
```

## 💡 Basic Usage

### Simple Initialization

```javascript
import { initDevosaurus } from 'devosaurus';

// Basic initialization with default settings
const devo = initDevosaurus();

// Or with custom configuration
const devo = initDevosaurus({
  language: 'en-US',  // Recognition language
  showUI: true        // Show floating visual badge
});
```

### Adding Custom Commands

```javascript
// Simple command
devo.addCommand('greet', ['hello', 'good morning'], () => {
  alert('Hello there! 👋');
});

// Command with multiple activation phrases
devo.addCommand('logout', ['sign out', 'logout', 'exit'], () => {
  window.location.href = '/logout';
});
```

## 📚 Real-World Examples

### 1\. DOM Actions - Element Manipulation

```javascript
import { initDevosaurus, Actions } from 'devosaurus';

const devo = initDevosaurus();

// Click a button via voice command
devo.addCommand('open menu', ['open menu', 'menu'], 
  Actions.click('.menu-button')
);

// Type into a text field
devo.addCommand('search product', ['search', 'find product'], 
  Actions.type('#search-input', 'gaming laptop')
);

// Activate visual debug mode (highlights all elements)
devo.addCommand('debug layout', ['debug', 'show layout'], 
  Actions.debugLayout('red')
);

// Toggle CSS class on body
devo.addCommand('dark mode', ['dark mode', 'toggle theme'], 
  Actions.toggleBodyClass('dark-mode')
);
```

### 2\. Navigation - History Control

```javascript
// Navigate to different pages
devo.addCommand('go home', ['go home', 'homepage'], 
  Actions.goTo('/')
);

devo.addCommand('go to products', ['products', 'view products'], 
  Actions.goTo('/products')
);

// Reload page
devo.addCommand('reload', ['reload', 'refresh page'], 
  Actions.reload()
);

// Go back
devo.addCommand('go back', ['go back', 'back'], 
  Actions.goBack()
);
```

### 3\. Forms - Automatic Filling

```javascript
// Magic fill for all form fields
devo.addCommand('fill form', ['fill form', 'autocomplete'], 
  Actions.Forms.fillMagic()
);

// Fill specific fields with test data
devo.addCommand('fill email', ['write email', 'fill email'], 
  Actions.Forms.fillField('#email', 'email')
);

devo.addCommand('fill name', ['write name'], 
  Actions.Forms.fillField('#name', 'name')
);

devo.addCommand('fill phone', ['write phone'], 
  Actions.Forms.fillField('#phone', 'phone')
);

// Select a random option in a dropdown
devo.addCommand('pick country', ['choose country', 'select country'], 
  Actions.Forms.pickRandomOption('#country-select')
);
```

### 4\. Storage - Local Data Management

```javascript
// Clear all storage (localStorage + sessionStorage)
devo.addCommand('clear data', ['delete all', 'clear storage'], 
  Actions.clear()
);

// View value of a specific key
devo.addCommand('view token', ['show token', 'check token'], 
  Actions.logItem('auth_token')
);
```

### 5\. Viewport - Scroll Control

```javascript
// Scroll to bottom
devo.addCommand('scroll down', ['go down', 'bottom of page'], 
  Actions.Viewport.scrollToBottom()
);

// Scroll to top
devo.addCommand('scroll up', ['go up', 'top'], 
  Actions.Viewport.scrollToTop()
);

// Scroll to specific element with visual highlight
devo.addCommand('go to footer', ['view footer', 'footer'], 
  Actions.Viewport.scrollToElement('footer')
);
```

### 6\. Clipboard - Copy Operations

```javascript
// Copy text from an element
devo.addCommand('copy title', ['copy title'], 
  Actions.Clipboard.copyTextFrom('h1')
);

// Copy current URL
devo.addCommand('copy url', ['copy link', 'copy address'], 
  Actions.Clipboard.copyUrl()
);

// Copy value from localStorage
devo.addCommand('copy session', ['copy token'], 
  Actions.Clipboard.copyStorageKey('session_id')
);
```

### 7\. Network - Testing & Simulation

```javascript
// Ping an API
devo.addCommand('check api', ['ping api', 'test api'], 
  Actions.Network.ping('https://api.example.com/health')
);

// Trigger a POST request
devo.addCommand('send webhook', ['trigger webhook'], 
  Actions.Network.triggerPost('https://api.example.com/webhook', {
    event: 'test',
    timestamp: Date.now()
  })
);

// Simulate offline mode (Chaos Engineering)
devo.addCommand('offline mode', ['go offline', 'disconnect network'], 
  Actions.Network.simulateOfflineMode(true)
);

devo.addCommand('restore network', ['connect network', 'go online'], 
  Actions.Network.simulateOfflineMode(false)
);

// Simulate slow network
devo.addCommand('slow network', ['simulate lag', 'slow connection'], 
  Actions.Network.simulateSlowNetwork(3000) // 3 seconds delay
);

// Reset network configuration
devo.addCommand('reset network', ['reset connection'], 
  Actions.Network.resetNetwork()
);
```

### 8\. Utilities - Async Helpers

```javascript
// Wait for a specific time (useful for sequences)
devo.addCommand('wait', ['hold on'], 
  Actions.Utils.wait(2000)
);

// Hard reload (bypassing cache)
devo.addCommand('hard reload', ['force reload'], 
  Actions.Utils.hardReload()
);
```

## 🎭 Full Example: E2E Testing Flow

```javascript
import { initDevosaurus, Actions } from 'devosaurus';

const devo = initDevosaurus({ language: 'en-US' });

// 1. Navigation
devo.addCommand('go to login', ['open login', 'login page'], 
  Actions.goTo('/login')
);

// 2. Fill form (Async sequence)
devo.addCommand('fill login', ['complete form'], async () => {
  Actions.type('#email', 'test@example.com')();
  await Actions.Utils.wait(500)();
  Actions.type('#password', 'Password123!')();
});

// 3. Submit
devo.addCommand('login', ['submit', 'sign in'], 
  Actions.click('#login-button')
);

// 4. Verification
devo.addCommand('verify dashboard', ['check dashboard'], async () => {
  await Actions.Utils.wait(1000)();
  const heading = document.querySelector('h1')?.textContent;
  console.log('Current Title:', heading);
});
```

## 🎨 Visual Interface

The library includes a floating badge with a 🦖 icon that indicates the recognition status:

  * **"Click to Speak"** - Inactive state
  * **"Listening..."** - Active recognition
  * **Visual Feedback** - Displays confirmation after executing commands

You can disable the UI by setting:

```javascript
initDevosaurus({ showUI: false });
```

## 🔧 Engine API

### Main Methods

  * **`addCommand(id, phrases, action)`** - Registers a new command.
  * **`toggleListening(forceState?)`** - Toggles listening state on/off.
  * **`getCommands()`** - Returns the list of registered commands.

## ⚙️ Configuration

```typescript
interface DevosaurusConfig {
  language?: string;      // Default: 'es-ES'
  activationKey?: string; // Activation key (Planned feature)
  showUI?: boolean;       // Default: true
}
```

Recognition default settings:

  * **continuous**: `false` (stops after detecting a complete phrase)
  * **interimResults**: `false` (final results only)
  * **maxAlternatives**: `1` (best match only)

## 🌐 Compatibility

Works in browsers supporting the Web Speech API:

  * Google Chrome (Desktop & Android)
  * Microsoft Edge
  * Safari (Limited support)

## 📝 License

Apache License 2.0

## 🚀 Development & Publishing

### Version Control

This project uses semantic versioning and conventional commits for consistent releases.

To release a new version:
```bash
# For patch releases (bug fixes)
npm run release

# For minor releases (new features)
npm run release:minor

# For major releases (breaking changes)
npm run release:major
```

### Manual Release Process

1. Update the version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Commit changes with a conventional commit message
4. Create a git tag
5. Push to GitHub
6. Publish to NPM

### Automated Release Process

We use release-it for automated releases:
```bash
npx release-it
```

This will:
- Bump the version in package.json
- Update the changelog
- Create a git commit and tag
- Push to GitHub
- Create a GitHub release
- Publish to NPM

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit using conventional commits
5. Push to your fork
6. Create a pull request

Please ensure your code follows the existing style and includes appropriate tests.

## 📌 Notes

  * **Presets return functions:** All presets must be executed as actions within a command.
  * **Async Support:** Full support for `async/await` for commands requiring delays or fetches.
  * **Partial Matching:** Commands activate if the transcript contains any of the registered phrases.
  * **Feedback:** Automatic visual feedback displays the ID of the executed command.
  * **Error Handling:** Robust error catching with console logs and user alerts.