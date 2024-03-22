import React, { useState } from 'react';
import options from "./options.json";

const getSelectedChip = ( color ) => ( {
  border: "1px solid " + color,
  backgroundColor: color,
  color: "#fff",
} );

// million-ignore
function Modes ( { onChange, onload } ) {
  const [ selectedOption, setSelectedOption ] = useState( onload );

  const handleOptionChange = ( { target } ) => {
    const value = options.find( x => x.value === target.value );
    setSelectedOption( value.value );
    onChange( value ); // Call onChange prop & pass to parent
  };
  return (
    <select className="m5 p5 rx5" onChange={handleOptionChange} value={selectedOption} style={selectedOption ? getSelectedChip( options.find( x => x.value === selectedOption ).color ) : {}}>
      {options.map( ( { value, name } ) => (
        <option key={value} value={value}>
          {name}
        </option>
      ) )}
    </select>
  )
};

export default Modes;
