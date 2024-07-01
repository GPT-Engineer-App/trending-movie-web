import React from "react";
import { hydrateRoot } from 'react-dom/client';
import App from "./App.jsx";
import "./index.css";

hydrateRoot(document.getElementById('root'), <App />, {
  onRecoverableError: (error, errorInfo) => {
    console.error('Recoverable hydration error:', error, errorInfo.componentStack);
  }
});
