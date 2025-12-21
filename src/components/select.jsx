import React from "react";
import Icon from "./icon";

export default function Select ( {
  options = [],
  value,
  onChange
} ) {

  return (
    <header className="f">
      <Icon
        className="m10"
        height={22}
        width={22}
        name={value}
        style={{ objectFit: "contain" }}
      ></Icon>

      <select
        className="b0 m5 p5"
        value={value}
        onChange={onChange}
        style={{ flexGrow: 1 }}
      >
        {options.map( ( opt ) => {
          let val = opt.value;

          return (
            <option key={val} value={val}>
              {opt.name}
            </option>
          )
        } )}
      </select>
    </header>
  );
}
