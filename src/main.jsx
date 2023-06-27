import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import App from './App.jsx';
import Doc from './Doc.jsx';

const router = createBrowserRouter( [
  { path: "/", element: <App /> },
  { path: "/doc", element: <Doc /> },
] );

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);