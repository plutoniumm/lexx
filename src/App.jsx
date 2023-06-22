import Modes from "./modes";
import { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

import options from "./options.json";

const starter = "svelte";
function App () {
  const [ mode, setMode ] = useState( { template: starter, files: {} } );

  const handleOptionChange = ( { value, type, files } ) => {
    // TEMPLATE
    if ( type === "template" )
      setMode( {
        template: value,
        files: files || {}
      } );
    // FILES
    if ( type === "files" ) {
      if ( files )
        setMode( { template: value, files } );
      else {
        const inherited = options.find( ( s ) =>
          s.value === value
        );
        setMode( {
          template: inherited.template,
          files: inherited.files
        } );
      }
    };
  };

  window.onmessage = ( { data: {
    type, value, files
  } } ) => handleOptionChange( {
    type, value, files
  } );

  const navbar = (
    <div className="f j-bw ">
      <div className="m10 title">LEXX</div>
      <Modes onload={starter} onChange={handleOptionChange} />
    </div>
  )

  return (
    <>
      {window.isTop && navbar}
      <Sandpack
        theme={atomDark}
        {...mode}
        options={{
          showInlineErrors: true,
          showNavigator: true,
          showReadOnly: false,
          showLineNumbers: true,
          showConsoleButton: true,
          showTabs: true,
          closableTabs: true,
          wrapContent: true,
        }}
      />
    </>
  );
};

export default App;