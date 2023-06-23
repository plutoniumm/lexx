import Modes from "./modes";
import { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import {
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview
} from "@codesandbox/sandpack-react";
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

  const addFile = () => {
    let tempMode = mode;
    const name = prompt( "Create File" );
    const ext = name.split( "." ).pop();
    if ( !( name || ext ) ) return 0;

    const { sandpack } = useSandpack();
    const { addFile } = sandpack;
    addFile( name, "" );
  };


  window.onmessage = ( { data: {
    type, value, files
  } } ) => handleOptionChange( {
    type, value, files
  } );

  const navbar = (
    <div className="f j-bw ">
      <div className="m10 title">
        LEXX
        <svg
          className="ptr p2 rx5"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          style={{
            height: "24px",
            width: "24px",
            margin: "5px 0 5px 7px",
            verticalAlign: "text-top",
            background: "#445",
            strokeWidth: "1",
          }}
          onClick={addFile}
        >
          <path d="M16 2 L16 30 M2 16 L30 16" stroke="#fff" />
        </svg>
      </div>
      <Modes
        onload={starter}
        onChange={handleOptionChange}
      />
    </div>
  )

  if ( window.isTop )
    return (
      <>
        {window.isTop && navbar}
        <SandpackProvider
          {...mode}
          theme={atomDark}
        >
          hi
          <SandpackLayout>
            <SandpackFileExplorer />
            <SandpackCodeEditor
              closableTabs
              showTabs={true}
              showLineNumbers={true}
              wrapContent={true}
            />
            <SandpackPreview />
          </SandpackLayout>
        </SandpackProvider>
      </>
    );
  else
    return (
      <Sandpack
        theme={atomDark}
        {...mode}
        options={{
          showInlineErrors: true,
          showNavigator: true,
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