// Autotemplating all templates in /templates/[value]/*
// config.json for confs
import fs from 'fs';

const dir = ( path ) => fs.readdirSync( path ).filter( name => !name.includes( '.' ) );

dir( "templates" ).forEach( ( value ) => {
  const data = dir( `templates/${ value }` );
  console.log( value, data );
} );
