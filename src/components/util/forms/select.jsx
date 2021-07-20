import React from "react";
import { useIntl } from "react-intl";

function Select({ name, label, options, ...rest }) {
  const intl = useIntl();
  const nothingSelected = intl.formatMessage({
    id: "dropdown_nothing_selected",
  });

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={options[name]}
        className="form-control"
        id={name}
        name={name}
        {...rest}
      >
        <option disabled selected>
          {nothingSelected}
        </option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
