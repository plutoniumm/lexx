import { useSandpack } from "@codesandbox/sandpack-react";
import { getHosted } from "./url";

function Sidebar ( { adder } ) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;

  const addFile = () => {
    const name = prompt( "Create file" );
    const ext = name.split( "." ).pop();
    if ( !( name || ext ) ) return 0;

    files[ "/" + name ] = { code: "" };
    adder( files );
  };

  const openLink = () => {
    const ocsb = document
      .querySelector( '[title="Open in CodeSandbox"]' );
    let href = "";

    if ( ocsb.tagName === "A" ) href = ocsb.href;
    if ( ocsb.tagName === "BUTTON" ) {
      const form = ocsb.querySelector( "form" );

      const inputs = form.querySelectorAll( "input" );
      let queries = {};
      inputs.forEach( input =>
        queries[ input.name ] = input.value
      );
      const orderedQuery = [ "parameters", "query", "environment" ]
        .map( name => `${ name }=${ queries[ name ] }` )
        .join( "&" );

      href = `${ form.action }?${ orderedQuery }`;
    };

    if ( !href ) return 0; // Gaurd
    console.log( "Opening: ", href );

    getHosted( href ).then( alert );
  };

  return (
    <div className="f fw" style={{ background: "var(--theme)", color: "#fff" }}>
      <div className="m5" style={{
        fontSize: "16px",
        lineHeight: "32px",
        color: "#fff6"
      }}>Console</div>

      <div className="tagchip" onClick={addFile}>
        <svg strokeWidth="2"
          className="quicon" viewBox="0 0 32 32"
        >
          <path d="M16 2 L16 30 M2 16 L30 16" stroke="#fff" />
        </svg>
        <div>Add File</div>
      </div>
      <div className="tagchip" onClick={openLink}>
        <svg strokeWidth="2"
          className="quicon" viewBox="0 0 32 32"
        >
          <path d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18" />
        </svg>
        <div>Open External</div>
      </div>
      <hr className="w-100 m0 o-25" />
    </div>
  );
};

export default Sidebar;