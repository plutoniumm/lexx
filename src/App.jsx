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

const startWith = "sveltevg";
const starter = options.find( x => x.value === startWith );
function App () {
  const [ mode, setMode ] = useState( starter );
  const [ expanded, setExpanded ] = useState( false );

  const toggleExpansion = () => setExpanded( !expanded );

  const handleOptionChange = ( opts ) => {
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

  if ( !window.isTop ) window.location.href = "/embed";
  return (
    <>
      <div className="f j-bw p5 rx10 p-fix logo">
        <img src="/lexx.svg" alt="" height="44" />
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
            {expanded && <SandpackConsole style={{
              height: "15%"
            }} />}
          </SandpackPreview>
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
};

export default App;