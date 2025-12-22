import Select from "./components/select";
import { useEffect, useState } from "react";
import headers from "./headers.json";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { SandpackFileExplorer } from 'sandpack-file-explorer';
import { atomDark } from "@codesandbox/sandpack-themes";

function App ( { path } ) {
  const init = headers.find( x => x.value === path );

  const [ header, setHeader ] = useState( init );
  const [ mode, setMode ] = useState( null );
  const [ expanded, setExpanded ] = useState( false );
  const [ Sel, setSel ] = useState( init.value );

  async function getMode ( name ) {
    if ( !name ) return;
    let res = await fetch( `/json/${ name }.json` )
      .then( r => r.json() );

    setMode( res );
  }

  useEffect( () => {
    getMode( header.value );
  }, [ header ] );

  const upState = ( { target } ) => {
    const value = headers.find( x => x.value === target.value );
    if ( !value ) return;

    setSel( value.value );
    setHeader( value );
  };

  return (
    <>
      <SandpackProvider
        {...mode}
        theme={atomDark}
        options={{ recompileMode: "delayed" }}
      >
        <SandpackLayout>
          <div id="sidebar" className="f-col">
            <Select
              options={headers}
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
          {mode && <SandpackPreview>
            <div className="tagchip" onClick={() => setExpanded( !expanded )}>
              <svg className="quicon" viewBox="0 0 24 24">
                <path stroke="#000" fill={expanded ? "#fff" : "#888"} stroke-width="2" d="M4 19H20l1-1V6L20 5H4L3 6V18Zm3-4 3-2-3-3m5 5h5" />
              </svg>
            </div>
            <SandpackConsole style={{
              height: expanded ? "50%" : "0px"
            }} />
          </SandpackPreview>}
        </SandpackLayout>
      </SandpackProvider>
    </>
  );
};

export default App;