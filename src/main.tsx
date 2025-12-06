import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";

// Run axe-core accessibility testing in development mode
if (import.meta.env.DEV) {
  import("@axe-core/react").then((axe) => {
    axe.default(React, ReactDOM, 1000).then(() => {
      console.log("🔍 Axe-core accessibility testing initialized");
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
