import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// check for iframe
const isTop = window.top === window.self;
window.isTop = isTop;

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);