import react from '@vitejs/plugin-react';
import MillionLint from '@million/lint';
import { exec } from 'child_process';
import { defineConfig } from 'vite';


function freeload () {
  return {
    name: 'custom-hmr',
    enforce: 'post',
    handleHotUpdate ( { file, server } ) {
      if ( file.includes( 'templates/' ) ) {
        exec( 'node scripts/template.js', ( err, out, sterr ) => {
        } );
      }
    },
  };
}

// HEADERS
const headers = new Map( [
  [ 'X-Frame-Options', 'DENY' ],
  [ 'X-XSS-Protection', '1; mode=block' ],
  [ 'X-Content-Type-Options', 'nosniff' ],
  [ 'Referrer-Policy', 'same-origin' ],
  [
    'Permissions-Policy',
    'accelerometer=(), autoplay=(), camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()'
  ],
  [
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  ],
] );

let headersString = '';
for ( const [ key, value ] of headers )
  headersString += `${ key }: ${ value }\n`;

// import { writeFile } from 'fs';
// import { resolve, join } from 'path';
// const buildDir = join( resolve(), 'build' );
// writeFile( join( buildDir, '_headers' ), headersString, ( err ) => {
//   if ( err ) return console.error( err );
//   console.log( 'Headers file created' );
// } );
// END HEADERS

export default defineConfig( {
  plugins: [
    MillionLint.vite( { enabled: true } ),
    freeload(),
    react()
  ],
  server: {
    port: 3000,
  }
} );