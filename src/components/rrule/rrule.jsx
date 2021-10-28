import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import RRuleGeneratorTS, { translations } from "react-rrule-generator-ts";
import "react-rrule-generator-ts/dist/index.css";

/**
 * A RRule components component.
 *
 * @param {object} props - The props.
 * @param {Array} props.value - The value
 * @param {Function} props.handleChange - The callback when something changed
 * @param {string} props.name - The id of the form element
 * @returns {object} - The rrule component
 */
function Rrule({ value, handleChange, name }) {
  const [rule, setRule] = useState(value);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (value && value.indexOf("\\n") > -1) {
      const localValue = `${value.split("\\n")[0]}
      ${value.split("\\n")[1]}`;
      setRule(localValue);
    }
  }, []);

  /**
   * A callback on changed data.
   *
   * @param {Array} data The data to call back with
   */
  function changeData(data) {
    const target = { value: data, id: name };
    setRule(data);
    handleChange({ target });
  }

  return (
    <>
      <RRuleGeneratorTS
        onChange={(newValue) => changeData(newValue)}
        config={{
          hideStart: false,
        }}
        value={rule}
        translations={translations.english}
      />
    </>
  );
}

Rrule.defaultProps = {
  value: "",
};

Rrule.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default Rrule;
