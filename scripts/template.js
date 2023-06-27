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

  return {
    name, color, template, value,
    type: 'files',
    files: tree
  };
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


writeFileSync( 'src/options.json',
  JSON.stringify( uniqueOps, null, 2 )
);

console.log( '\x1b[32m%s\x1b[0m', 'Generated Templates!' );