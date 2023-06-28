// inMemory+localStorage Cache
const memory = {};
const redirected = async ( key ) => {
  // 1. check localstorage.redirects
  // 2. if not exists, add value from memory
  // 3. if not in memory, fetch from server
  // 4. add to memory and localstorage
  // 5. return value
  const redirects = JSON.parse( localStorage.getItem( "redirects" ) ) || {};
  if ( redirects[ key ] ) return redirects[ key ];

  if ( memory[ key ] ) {
    redirects[ key ] = memory[ key ];
    localStorage.setItem( "redirects", JSON.stringify( redirects ) );
    return memory[ key ];
  };

  const res = await fetch( `https://x.manav.ch/p2/redirect?url=${ key }` )
    .then( res => res.text() );

  console.log( 302, res );
  memory[ key ] = res;
  redirects[ key ] = res;
  localStorage.setItem( "redirects", JSON.stringify( redirects ) );

  return memory[ key ];
};

export const getHosted = async ( key ) => {
  const url = await redirected( key );

  const paths = new URL( url ).pathname.split( "/" );
  return `https://${ paths.at( -1 ) }.csb.app/`;
};