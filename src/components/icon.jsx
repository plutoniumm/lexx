import React from "react";

const Map = {
  markdown: "markdown",
  md: "markdown",
  vue: "vue",
  html: "html",
  svelte: "svelte",
  jsx: "react",
  'vite-preact': "preact",
  ocaml: "ocaml",
  rs: "rust",
  rust: "rust",
  java: "java",
  python: "python",
  c: "c",
  cpp: "cpp",
  go: "go",
  golang: "go",
  solid: "solid",
};

function norm ( name ) {
  if ( !name ) return Map[ "html" ];
  const key = String( name ).trim().toLowerCase();

  if ( !Object.hasOwn( Map, key ) )
    return Map[ "html" ];

  return Map[ key ];
}

export default function Icon ( {
  name,
  width,
  height,
  alt,
  className,
  ...rest
} ) {
  let src = norm( name );

  return (
    <img
      src={`/icons/${ src }.svg`}
      width={width}
      height={height}
      alt={alt ?? src}
      className={className}
      {...rest}
    />
  );
}