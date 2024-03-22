import { useState } from "react";
import options from "./options.json";

import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

const startWith = "sveltevg"
const starter = options.find( x => x.value === startWith );
function App () {
  const [ mode, setMode ] = useState( {
    template: starter.template,
    files: starter.files || {}
  } );

  const handleOptionChange = ( { value, type, files } ) => {
    if ( type !== "template" && type !== "files" ) return 0;
    console.log( `Running Type: ${ type } \n| Value: ${ value } \n| Files: ${ Object.keys( files || {} ) }` );
    // TEMPLATE
    if ( type === "template" )
      setMode( { template: value, files: files || {} } );
    // FILES
    if ( type === "files" ) {
      let mode = {}
      if ( files ) mode = { template: value, files }
      else {
        const i = options.find( s =>
          s.value === value
        );
        mode = { template: i.template, files: i.files };
      }
      setMode( mode );
    };
  };

  window.onmessage = ( { data } ) =>
    handleOptionChange( data );

  return (
    <Sandpack
      theme={atomDark}
      {...mode}
      options={{
        showInlineErrors: true,
        showReadOnly: false,
        showLineNumbers: true,
        showConsoleButton: true,
        closableTabs: true,
        wrapContent: true,
      }}
    />
  )
};

export default App;