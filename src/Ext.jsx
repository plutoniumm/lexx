import { block } from "million/react";

const Ext = block( function Ext () {
  const id = new URLSearchParams( window.location.search ).get( "id" );
  if ( !id ) window.location.href = "/";

  console.log( id.toString() );

  return (
    <div className="h-100 w-100" style={{
      border: "1px solid green",
    }}>
      {JSON.stringify( id )}
      <iframe src={id} frameborder="0" className="w-100 h-100"></iframe>
    </div>
  )
} );

export default Ext;