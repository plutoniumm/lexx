import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// check for iframe
const isTop = window.top === window.self;
window.isTop = isTop;

// --sp-layout-height: calc(100vh - 40px - 20px)
const style = `.sp-layout {
  --sp-layout-height: ${ isTop ? 'calc(100vh - 40px - 20px)' : '100vh' } !important;
}`;
const styleEl = document.createElement( 'style' );
styleEl.innerHTML = style;
document.head.appendChild( styleEl );


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);