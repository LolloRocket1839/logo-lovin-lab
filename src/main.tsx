import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update
const updateSW = registerSW({
  onNeedRefresh() {
    // Auto update without prompting
    updateSW(true);
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
