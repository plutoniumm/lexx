import React, { useState } from 'react';
import options from "./options.json";

const getChip = ( color ) => ( {
  border: "1px solid " + color,
  color: color,
} );
const getSelectedChip = ( color ) => ( {
  border: "1px solid " + color,
  backgroundColor: color,
  color: "#fff",
} );

const Modes = ( { onChange } ) => {
  const [ selectedOption, setSelectedOption ] = useState( '' );

  const handleOptionChange = ( { target } ) => {
    const { dataset } = target;
    const value = JSON.parse( dataset.value );

    setSelectedOption( value.value );
    onChange( value ); // Call the onChange prop and pass the selected value to the parent
  };

  return (
    <ul className="selectors f m0 p0">
      {options.map( ( { value, name, color, type } ) => {
        const checked = selectedOption === value;

        return (
          <li className="m10 ptr tc rx20" key={value + name} style={
            checked ? getSelectedChip( color ) : getChip( color )
          }>
            <label className="selector" htmlFor={value}>{name}</label>
            <input
              className="p5 d-n"
              id={value}
              type="radio"
              value={value}
              data-value={JSON.stringify( { value, type } )}
              checked={checked}
              onChange={handleOptionChange}
            />
          </li>
        )
      } )}
    </ul>
  );
};

export default Modes;
