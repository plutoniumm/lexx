import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

window.proxy_prefix = 'https://raw.githubusercontent.com/plutoniumm/lexx/master/wassemblers/cpp/';

const tbox = new Terminal( {
  cursorBlink: true,
  convertEol: true,
  disableStdin: true,
} );
const term = document.querySelector( '#terminal' );
tbox.open( term );
tbox.write( 'Terminal Ready. Compile Now!\n' );

class WorkerAPI {
  constructor () {
    this.nextResponseId = 0;
    this.responseCBs = new Map();
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = this.onmessage.bind( this );

    const remotePort = channel.port2;
    const remote = window.proxy_prefix + 'worker.js';
    fetch( remote ).then( res => res.blob() )
      .then( blob => {
        this.worker = new Worker( URL.createObjectURL( blob ) );
        this.worker.postMessage( {
          id: 'constructor',
          mod: window.proxy_prefix,
          data: remotePort
        }, [ remotePort ] );
      } );
  }

  terminate () {
    this.worker.terminate();
  }

  async compileToAssembly ( options ) {
    const responseId = this.nextResponseId++;
    const responsePromise = new Promise( ( resolve, reject ) => {
      this.responseCBs.set( responseId, { resolve, reject } );
    } );
    this.port.postMessage( {
      id: 'compileToAssembly',
      responseId,
      mod: window.proxy_prefix,
      data: options
    } );
    return await responsePromise;
  }

  compileLinkRun ( contents ) {
    this.port.postMessage( {
      id: 'compileLinkRun',
      mod: window.proxy_prefix,
      data: contents
    } );
  }

  onmessage ( event ) {
    switch ( event.data.id ) {
      case 'write':
        tbox.write( event.data.data );
        break;

      case 'compileToAssembly': {
        const responseId = event.data.responseId;
        const promise = this.responseCBs.get( responseId );
        if ( promise ) {
          this.responseCBs.delete( responseId );
          promise.resolve( event.data.data );
        };
        break;
      }
    }
  }
};

let api;
document
  .querySelector( '#compile' )
  .addEventListener( 'click', async () => {
    api = new WorkerAPI();
    const start = await import( './main.cpp' );
    api.compileLinkRun( start.default );
  } );