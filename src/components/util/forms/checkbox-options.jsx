import { React } from "react";

function CheckboxOptions({formData, data, onChange}) {
  const values = data[formData.name];

  const containsValue = (value) => {
    return values.includes(value);
  }

  const onOptionChange = ({target}) => {
    const value = target.value;

    const newValues = [...values];

    if (newValues.includes(value)) {
      newValues.splice(newValues.indexOf(value), 1);
    } else {
      newValues.push(value);
    }

    onChange({
      target: { id: formData.name, value: newValues },
    });
  }

  return (<>
    {
      formData.options.map(option =>
        <div className={formData.formGroupClasses}>
          <input type="checkbox" key={option.value} value={option.value} onChange={onOptionChange} checked={containsValue(option.value)} /> {option.title}
        </div>
      )
    }
  </>);
}

export default CheckboxOptions;
