import { readdirSync, readFileSync, writeFileSync } from 'fs';

// DEFNS
const root = "templates";
const dir = ( path, filter = false ) => {
  const files = readdirSync( path );
  if ( filter )
    return files.filter( name => !name.includes( '.' ) );

  return files;
};
const file = ( path ) => readFileSync( path, 'utf8' );

// MAIN
const origOps = JSON.parse( file( 'scripts/basic.json' ) );
const newOps = dir( root, true ).map( ( value ) => {
  let url = `${ root }/${ value }/`;
  const data = dir( url );
  const tree = {};
  data.forEach( ( name ) =>
    tree[ name ] = file( `${ url }${ name }` )
  );

  // GET CONFIG
  let config = tree[ 'config.json' ];
  if ( !config ) throw new Error( `No config.json found in ${ value }` );

  config = JSON.parse( config );
  delete tree[ 'config.json' ];

  const active = config.active;
  tree[ active ] = {
    active: true,
    code: tree[ active ]
  };

  const { name, color, template } = config;
  const response = {
    name, color, template, value,
    type: 'files',
    files: tree
  };

  if ( config.customSetup ) {
    response.customSetup = config.customSetup;
  };
  if ( config.options ) {
    response.options = config.options;
  };

  return response;
} );

const options = [ origOps, newOps ].flat( 1 );

let uniqueOps = [];
const doneValues = [];
for ( let i = 0;i < options.length;i++ ) {
  const { value } = options[ i ];
  if ( doneValues.includes( value ) ) continue;

  doneValues.push( value );
  uniqueOps.push( options[ i ] );
};


// create seperate headers.json with names and values
//  and json/<value>.json with the rest of the data
writeFileSync( 'src/headers.json',
  JSON.stringify(
    uniqueOps.map( ( { name, value, color, type } ) => ( { name, value, color, type } ) ),
    null, 2
  )
);

// create json files
uniqueOps.forEach( ( { value, ...data } ) =>
  writeFileSync( `public/json/${ value }.json`,
    JSON.stringify( data, null, 2 )
  )
);

console.log( '\x1b[32m%s\x1b[0m', 'Generated Templates!' );