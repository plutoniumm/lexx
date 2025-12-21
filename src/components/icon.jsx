import React from "react";

const Map = {
  markdown: "md",
  md: "md",
  vue: "vue",
  js: "js",
  css: "css",
  html: "html",
  svelte: "svelte",
  jsx: "react",
  react: "react",
  ml: "ocaml",
  ocaml: "ocaml",
  rs: "rust",
  rust: "rust",
  java: "java",
  python: "python",
  py: "python",
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  go: "go",
  golang: "go",
  solid: "solid",
};

function normalizeName ( name ) {
  if ( !name ) return "";
  const key = String( name ).trim().toLowerCase();

  return Map[ key ] ?? key;
}

export default function Icon ( {
  name,
  width,
  height,
  alt,
  className,
  ...rest
} ) {
  const normalized = normalizeName( name );
  const src = normalized ? `/icons/${ normalized }.svg` : "";

  // If name is missing, render nothing (avoids broken requests)
  if ( !src ) return null;

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={alt ?? normalized}
      className={className}
      {...rest}
    />
  );
}

export { Icon };