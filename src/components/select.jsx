import React from "react";

export default function Select ( { options = [], value, onChange } ) {
  return (
    <select
      className="b0 p5"
      value={value}
      onChange={onChange}
    >
      {options.map( ( opt ) => {
        let val = opt.value;

        return (
          <option key={val} value={val}>
            {opt.label ?? val}
          </option>
        )
      } )}
    </select>
  );
}
