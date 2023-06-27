import React, { useState } from 'react';
import { block, For } from "million/react";
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

const Modes = /* @optimize */ block( function Modes ( { onChange, onload } ) {
  const [ selectedOption, setSelectedOption ] = useState( onload );

  const handleOptionChange = ( { target } ) => {
    const { dataset } = target;
    const value = JSON.parse( dataset.value );

    setSelectedOption( value.value );
    onChange( value ); // Call the onChange prop and pass the selected value to the parent
  };

  return (
    <ul className="selectors f m0 p0 flow-x-s">
      <For each={options}>{
        ( { value, name, color, type } ) => {
          const checked = selectedOption === value;

          return (
            <li className="m10 p10 ptr tc rx20" key={value + name} style={
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
        }
      }</For>
    </ul>
  );
} );

export default Modes;
