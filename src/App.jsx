import Modes from "./modes";
import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

// let files = {
//   "/App.js": "const App = () => <button>Click me</button>",
//   "/button.js": {
//     code: "export const Button = () => <button>Click me</button>",
//   },
// };

function App () {
  let files = {};
  let template = "";
  const handleOptionChange = ( { value, type } ) => {
    console.log( 'Selected option:', value, type );
    if ( type === "template" ) {
      template = value;
    };
  };

  return (
    <>
      <Modes
        onChange={handleOptionChange}
      />
      <Sandpack
        theme={atomDark}
        files={files}
        template={template}
      />
    </>
  );
};

export default App;