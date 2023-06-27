let marked = null;
const getMarked = async () => {
  if ( !marked )
    marked = await import( 'https://cdn.jsdelivr.net/npm/marked/marked.min.js' )
      .then( m => m.default )

  return marked;
}

fetch( 'index.md' )
  .then( r => r.text() )
  .then( async ( text ) => {
    if ( !marked ) await getMarked();
    console.log( marked );
    // document.body.innerHTML = marked( text )
  } )