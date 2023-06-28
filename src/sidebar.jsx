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
    <div style={{ background: "var(--theme)" }}>
      <svg
        className="quicon rpm-5" viewBox="0 0 32 32" onClick={addFile}
      >
        <path d="M16 2 L16 30 M2 16 L30 16" stroke="#fff" />
      </svg>
      <hr className="w-50 o-25" />
      <svg
        className="quicon rpm-5" viewBox="0 0 32 32" onClick={openLink}
      >
        <path d="M14 9 L3 9 3 29 23 29 23 18 M18 4 L28 4 28 14 M28 4 L14 18" />
      </svg>
    </div>
  );
};

export default Sidebar;