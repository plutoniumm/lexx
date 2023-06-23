import Modes from "./modes";
import Sidebar from "./sidebar";

import { useState } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import {
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
  const [ mode, setMode ] = useState( {
    template: starter,
    files: {}
  } );

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

  const adder = ( files ) => {
    const template = mode.template;
    setMode( { template, files } )
  };

  window.onmessage = ( { data } ) =>
    handleOptionChange( data );

  if ( window.isTop )
    return (
      <>
        <div className="f j-bw ">
          <div className="m10 title">LEXX</div>
          <Modes onload={starter} onChange={handleOptionChange} />
        </div>
        <SandpackProvider {...mode} theme={atomDark}>
          <SandpackLayout>
            <Sidebar adder={adder} />
            <SandpackFileExplorer />
            <SandpackCodeEditor
              closableTabs
              showTabs
              showLineNumbers
              wrapContent
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