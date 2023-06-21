import Modes from "./modes";
import { Sandpack } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";

function App () {
  let files = {
    "/App.js": "const App = () => <button>Click me</button>",
    "/button.js": {
      code: "export const Button = () => <button>Click me</button>",
    },
  }

  return (
    <>
      <Modes />
      <Sandpack
        theme={atomDark}
        files={files}
      />
    </>
  )
};

export default App;