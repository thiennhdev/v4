import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/source-serif-4/opsz-italic.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './styles/global.css';
import App from './App';

// The old Gatsby site installed an offline service worker. This site has none,
// so remove any leftover registration (public/sw.js handles visitors still
// being served the cached old site).
if ('serviceWorker' in navigator) {
  void navigator.serviceWorker
    .getRegistrations()
    .then((regs) => regs.forEach((r) => void r.unregister()))
    .catch(() => {});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
