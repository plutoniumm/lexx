import React, { useState } from 'react';

const modes = [
  { name: "Svelte" },
  { name: "React" },
];

function Selector ( { onSelect } ) {
  const [ selectedMode, setSelectedMode ] = useState( '' );

  const handleModeSelect = ( mode ) => {
    setSelectedMode( mode );
    onSelect( mode );
  };

  return (
    <ul className="f p0 d-b">
      {modes.map( ( mode ) => (
        <li key={mode.name}>
          <label className="rx5 p10 m10 ptr selector" htmlFor={mode.name}>
            <input
              className="d-n"
              type="radio"
              name="mode"
              value={mode.name}
              id={mode.name}
              checked={selectedMode === mode.name}
              onChange={() => handleModeSelect( mode.name )}
            />
            {mode.name}
          </label>
        </li>
      ) )}
    </ul>
  );
}

export default Selector;