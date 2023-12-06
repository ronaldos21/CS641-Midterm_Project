/*
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  // Save user preference to local storage
  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkModeEnabled);
}

// Check user preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';

  if (isDarkModeEnabled) {
    document.body.classList.add('dark-mode');
  }
});

// Render the React App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Example: Add event listener to a button with ID "darkModeToggle"
const darkModeToggleBtn = document.getElementById("darkModeToggle");

if (darkModeToggleBtn) {
  darkModeToggleBtn.addEventListener('click', toggleDarkMode);
}

