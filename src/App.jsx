import Sidebar from "./components/sidebar";
import Select from "./components/select";
import { useState } from "react";
import options from "./options.json";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { SandpackFileExplorer } from 'sandpack-file-explorer';
import { atomDark } from "@codesandbox/sandpack-themes";

const startWith = "svelte";
const starter = options.find( x => x.value === startWith );

function App () {
  const [ mode, setMode ] = useState( starter );
  const [ expanded, setExpanded ] = useState( false );
  const [ Sel, setSel ] = useState( startWith );

  const toggleExpansion = () => setExpanded( !expanded );

  const upState = ( { target } ) => {
    const value = options.find( x => x.value === target.value );
    setSel( value.value );
    onChange( value );
  };

  const onChange = ( opts ) => {
    const type = opts.type;
    if ( type !== "template" && type !== "files" ) return 0;
    if ( type === "template" ) {
      opts.template = opts.value;
    };
    setMode( opts );
  };

  const adder = ( files ) => {
    const template = mode.template;
    setMode( { template, files } )
  };

  return (
    <>
      <SandpackProvider {...mode} theme={atomDark} options={{
        recompileMode: "delayed"
      }}>
        <SandpackLayout>
          <div id="sidebar" className="f-col">
            <Select
              options={options}
              value={Sel}
              onChange={upState}
            />
            <SandpackFileExplorer />
          </div>
          <SandpackCodeEditor
            showTabs={false}
            showInlineErrors
            showLineNumbers
            wrapContent
          />
          <SandpackPreview>
            <Sidebar
              adder={adder}
              toggle={toggleExpansion}
              expanded={expanded}
            />
            {expanded && <SandpackConsole style={{
              height: "50%"
            }} />}
          </SandpackPreview>
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
};

export default App;