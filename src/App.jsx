import Modes from "./modes";
import Sidebar from "./sidebar";
import { useState } from "react";
import options from "./options.json";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

const startWith = "sveltevg"
const starter = options.find( x => x.value === startWith );
function App () {
  const [ mode, setMode ] = useState( {
    template: starter.template,
    files: starter.files || {}
  } );
  const [ expanded, setExpanded ] = useState( false );

  const toggleExpansion = () =>
    setExpanded( !expanded );


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

  const adder = ( files ) => {
    const template = mode.template;
    setMode( { template, files } )
  };

  window.onmessage = ( { data } ) =>
    handleOptionChange( data );

  if ( !window.isTop ) {
    window.location.href = "/embed"
  }

  return (
    <>
      <div className="f j-bw ">
        <div className="m10 title p-rel">
          <div className="p-abs" style={{ color: "#F0F", left: "4px" }}>
            LEXX
          </div>
          <div className="p-abs" style={{ color: "#0FF", left: "1px" }}>
            LEXX
          </div>
        </div>
        <Modes onload={startWith} onChange={handleOptionChange} />
      </div>
      <SandpackProvider {...mode} theme={atomDark} options={{
        recompileMode: "delayed"
      }}>
        <SandpackLayout>
          <SandpackFileExplorer />
          <SandpackCodeEditor
            closableTabs
            showTabs
            showLineNumbers
            wrapContent
          />
          <SandpackPreview>
            <Sidebar
              adder={adder}
              toggle={toggleExpansion}
              expanded={expanded}
            />
            {expanded && <SandpackConsole style={{ height: "15%" }} />}
          </SandpackPreview>
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
};

export default App;