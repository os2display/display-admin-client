import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

const MultiSelectComponent = ({ options, handleTagSelection, selected }) => {
  function filterOptions(options, filter) {
    if (!filter) {
      return options;
    }
    const re = new RegExp(filter, "i");
    return options.filter(({ label }) => label && label.match(re));
  }

  return (
    <MultiSelect
      isCreatable={true}
      options={options}
      value={selected}
      filterOptions={filterOptions}
      onChange={handleTagSelection}
    ></MultiSelect>
  );
};

export default MultiSelectComponent;
