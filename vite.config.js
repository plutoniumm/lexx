import { defineConfig } from 'vite';
import { writeFile } from 'fs';
import { resolve, join } from 'path';
import react from '@vitejs/plugin-react';

// HEADERS
const buildDir = join( resolve(), 'build' );
const headers = new Map( [
  [ 'X-Frame-Options', 'DENY' ],
  [ 'X-XSS-Protection', '1; mode=block' ],
  [ 'X-Content-Type-Options', 'nosniff' ],
  [ 'Referrer-Policy', 'same-origin' ],
  [ 'Permissions-Policy', 'accelerometer=(), autoplay=(), camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()' ],
  [ 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload' ],
] );

let headersString = '';
for ( const [ key, value ] of headers )
  headersString += `${ key }: ${ value }\n`;

// writeFile( join( buildDir, '_headers' ), headersString, ( err ) => {
//   if ( err ) return console.error( err );
//   console.log( 'Headers file created' );
// } );
// END HEADERS
// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [ react() ],
  server: {
    port: 3000,
  }
} );