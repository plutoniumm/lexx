import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from './App.jsx';
import Doc from './Doc.jsx';
import Ext from './Ext.jsx';

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/doc", element: <Doc /> },
  { path: "/ext", element: <Ext /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>}
    />
  </StrictMode>
);