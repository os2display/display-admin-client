import { React } from "react";

/**
 * @param root0
 * @param root0.formData
 * @param root0.data
 * @param root0.onChange
 */
function CheckboxOptions({ formData, data, onChange }) {
  const values = data[formData.name] ?? [];

  const containsValue = (value) => {
    return values.includes(value);
  };

  const onOptionChange = ({ target }) => {
    const { value } = target;

    const newValues = [...values];

    if (newValues.includes(value)) {
      newValues.splice(newValues.indexOf(value), 1);
    } else {
      newValues.push(value);
    }

    onChange({
      target: { id: formData.name, value: newValues },
    });
  };

  return (
    <div className={formData.formGroupClasses}>
      {formData.options.map((option) => (
        <div className="ms-2 mb-2" key={option.value}>
          <input
            type="checkbox"
            className="form-check-input me-1"
            value={option.value}
            onChange={onOptionChange}
            checked={containsValue(option.value)}
          />{" "}
          {option.title}
        </div>
      ))}
    </div>
  );
}

export default CheckboxOptions;
