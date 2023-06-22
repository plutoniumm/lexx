import { useState } from "react";
import Modes from "./modes";
import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

import options from "./options.json";

function App () {
  const [ mode, setMode ] = useState( "svelte" );

  const handleOptionChange = ( { value, type } ) => {
    console.log( 'Selected option:', value, type );
    if ( type === "template" )
      setMode( {
        template: value,
        files: {}
      } );
    if ( type === "files" ) {
      const { template, files } = options.find( ( s ) => s.value === value );
      setMode( { template, files } );
    }
  };

  return (
    <>
      {
        window.isTop && (
          <div className="f j-bw ">
            <div className="m10 title">LEXX</div>
            <Modes onChange={handleOptionChange} />
          </div>
        )}

      <Sandpack theme={atomDark} {...mode} />
    </>
  );
};

export default App;