"use strict";

window.proxy_prefix = 'https://raw.githubusercontent.com/plutoniumm/wassemblers/master/cpp/';

const tbox = new Terminal( {
  cursorBlink: true,
  convertEol: true,
  disableStdin: true,
} );
const term = document.querySelector( '#terminal' );
tbox.open( term );
tbox.error = ( str ) => tbox.write( '\x1b[31m' + str + '\x1b[0m' );
tbox.warn = ( str ) => tbox.write( '\x1b[33m' + str + '\x1b[0m' );
tbox.info = ( str ) => tbox.write( '\x1b[36m' + str + '\x1b[0m' );

function PlaygroundOutput ( el ) {
  return function ( write ) {
    if ( write.Kind == "start" ) {
      el.innerHTML = "";
      return;
    }

    var cl = "system";
    if ( write.Kind == "stdout" || write.Kind == "stderr" )
      cl = write.Kind;

    var m = write.Body;
    if ( write.Kind == "end" ) {
      m = "\nProgram exited" + ( m ? ": " + m : "." );
    }

    if ( m.indexOf( "IMAGE:" ) === 0 ) {
      // TODO(adg): buffer all writes before creating image
      var url = "data:image/png;base64," + m.substr( 6 );
      var img = document.createElement( "img" );
      img.src = url;
      el.appendChild( img );
      return;
    };

    m = m.replace( /&/g, "&amp;" );
    m = m.replace( /</g, "&lt;" );
    m = m.replace( />/g, "&gt;" );

    var span = document.createElement( "span" );
    span.className = cl;
    span.innerHTML = m;
    el.appendChild( span );
  };
}

( function () {
  const highlightOutput = ( wrapper ) => ( w ) => wrapper( w );

  /*interface Opts {
    codeEl: string; # code editor element
    outputEl: string; # program output element
    runEl: string; # run button element
    toysEl?: string; # toys select element
    enableVet?: boolean; # enable running vet and displaying its errors
  }*/
  function playground ( opts ) {
    var transport = opts[ "transport" ];
    var running;

    var outdiv = $( opts.outputEl );
    outdiv.innerHTML = "";
    var output = document.createElement( "pre" );
    outdiv.appendChild( output );

    const codel = $( opts.codeEl );
    fetch( '/run.go' ).then( r => r.text() )
      .then( r => {
        codel.value = r;
        codel.style.display = 'none';
      } );

    function run () {
      tbox.clear();
      tbox.write( "Preparing...\n" );
      if ( running ) running.Kill();
      tbox.write( "Running...\n> " );
      running = transport.Run(
        codel.value,
        highlightOutput( PlaygroundOutput( output ) ),
      );
    }
    $( opts.runEl ).onclick = run;
  }

  window.playground = playground;
} )();