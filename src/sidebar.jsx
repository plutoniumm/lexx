import { useSandpack } from "@codesandbox/sandpack-react";

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

  const openLink = () => window.open( document
    .querySelector( "iframe.sp-preview-iframe" ).src,
    "_blank"
  );

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
  )
};

export default Sidebar;