import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global error & unhandled promise rejection guard
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    // Log developer diagnostics in console
    console.warn('[Global Guard] Handled async rejection:', event.reason);
    // Prevent unhandled rejection runtime crashes
    event.preventDefault();
  });

  window.addEventListener('error', (event) => {
    // Check if error is related to dev WebSocket or external Vite HMR
    if (
      event.message?.includes('WebSocket') ||
      event.message?.includes('websocket') ||
      event.filename?.includes('@vite')
    ) {
      // Benign Vite development HMR connection notice - prevent noisy overlay
      event.preventDefault();
      return;
    }
    console.error('[Global Guard] Application runtime error captured:', event.error || event.message);
  });
}

const rootElement = document.getElementById('root')!;
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}


