import React from "react";
//import ReactDOM from "react-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save user preference to local storage
  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkModeEnabled);
}

// Check user preference for dark mode
const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

if (isDarkModeEnabled) {
  document.body.classList.add('dark-mode');
}

// Use createRoot to render the React App
const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Example: Add event listener to a button with ID "darkModeToggle"
const darkModeToggleBtn = document.getElementById("darkModeToggle");

if (darkModeToggleBtn) {
  darkModeToggleBtn.addEventListener('click', toggleDarkMode);
}