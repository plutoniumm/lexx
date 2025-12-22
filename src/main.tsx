import React from 'react';
import { createBrowserRouter, RouterProvider, useLoaderData } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import Fuse from "fuse.js";

import App from './App.jsx';
import Headers from "./headers.json";

let keys = Headers.map(h => h.value);

// Fuzzy matcher for route param -> closest known key
const fuse = new Fuse(keys, {
  includeScore: true,
  threshold: 0.35,
});

const resolvePath = (raw?: string) => {
  const input = (raw ?? "").trim();
  if (!input) return "svelte";
  if (keys.includes(input)) return input;
  const res = fuse.search(input)[0]?.item;
  return res ?? "svelte";
};

function AppRoute () {
  const resolved = useLoaderData() as string;
  return <App path={resolved} />;
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={
    createBrowserRouter([
      { path: "/", element: <App path={"svelte"} /> },
      {
        path: "/:path",
        loader: ({ params }) => resolvePath(params.path),
        element: <AppRoute />,
      },
    ])
  } />
);