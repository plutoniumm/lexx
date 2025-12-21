import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import { marked } from "marked";
import hljs from 'highlight.js';
import yaml from "js-yaml";

const renderer = {
  code ( text, level ) {
    if ( level === "mermaid" ) {
      return `<pre class="mermaid">${ text }</pre>`;
    }
    if ( level === "psd" ) {
      return `<pre class="language-ps">${ text }</pre>`;
    };
    return false;
  }
};

const options = {
  katex: {
    throwOnError: false,
    output: "mathml",
  },
  hljs: {
    langPrefix: 'hljs language-',
    highlight ( code, lang ) {
      if ( lang === "psd" ) {
        const rendered = code
          .split( "\n" )
          .map( ( e, i ) => {
            return `<div class="ps"><m>${ i }:</m>&ensp;${ marked( e, mcf )
              }</div>`;
          } )
          .join( "" );
        return rendered;
      };
      const language = hljs.getLanguage( lang ) ? lang : 'plaintext';
      return hljs.highlight( code, { language } ).value;
    }
  }
}

marked
  .use( markedKatex( options.katex ) )
  .use( markedHighlight( options.hljs ) )
  .use( { renderer } )

const mcf = { mangle: false, headerIds: false };
export default function render ( text ) {
  let [ , m, ...rest ] = text.split( "---" );
  m = yaml.load( m?.trim(), { json: true } );

  rest = rest.join( "---" )
  let html = marked( rest, mcf );

  for ( let key in m ) {
    html = html.replace( `&${ key };`, m[ key ] );
  }
  return { meta: m, html }
};
