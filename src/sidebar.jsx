import { useSandpack } from "@codesandbox/sandpack-react";
import { getHosted } from "./url";

// million-ignore
function Sidebar ( { adder, toggle, expanded } ) {
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
      <div className="tagchip" onClick={toggle}>
        <svg className="quicon" viewBox="0 0 32 32">
          {
            expanded ?
              <path d="M30 12 L16 24 2 12" />
              :
              <path d="M2 20 L16 8 30 20" />
          }
        </svg>
      </div>

      <div className="tagchip" onClick={addFile}>
        <svg className="quicon" viewBox="0 0 32 32">
          <path d="M16 2 L16 30 M2 16 L30 16" stroke="#fff" />
        </svg>
        <div>Add File</div>
      </div>
      <div className="tagchip" onClick={openLink}>
        <svg className="quicon" viewBox="0 0 32 32">
          <path d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18" />
        </svg>
        <div>Open External</div>
      </div>
      <hr className="mx-a w-100" style={{ opacity: "0.1" }} />
    </div>
  );
};

export default Sidebar;