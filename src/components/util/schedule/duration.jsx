import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { InputGroup } from "react-bootstrap";
import FormInput from "../forms/form-input";

/**
 * Duration component.
 *
 * @param {object} props - The props.
 * @param {string} props.label - Label.
 * @param {number} props.duration - Input duration
 * @param {Function} props.onChange - OnChange function.
 * @returns {object} - Component.
 */
function Duration({ label, duration, onChange }) {
  const { t } = useTranslation("common");
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();

  const onValueChange = ({ target }) => {
    const targetValue = parseInt(target.value, 10);

    if (target.id === "duration_hour") {
      onChange(minutes * 60 + targetValue * 3600);
    } else if (target.id === "duration_minute") {
      onChange(targetValue * 60 + hours * 3600);
    }
  };

  useEffect(() => {
    if (duration !== undefined) {
      const seconds = duration % 60;
      const durationWithoutSeconds = duration - seconds;
      const newMinutes = durationWithoutSeconds / 60;
      const minutesLeft = newMinutes % 60;
      const newHours = (durationWithoutSeconds - minutesLeft * 60) / 3600;

      setHours(newHours);
      setMinutes(minutesLeft);
    }
  }, [duration]);

  return (
    <div className="row">
      <label className="mb-2" htmlFor="duration_hour">
        {label}
      </label>
      <div className="col">
        <FormInput
          label={null}
          value={hours}
          onChange={onValueChange}
          name="duration_hour"
          type="number"
          min="0"
          aria-label={t("duration.hours")}
          aria-describedby="duration-hours"
          inputGroupExtra={
            <InputGroup.Text id="duration-hours">
              {t("duration.hours")}
            </InputGroup.Text>
          }
        />
      </div>
      <div className="col">
        <FormInput
          label={null}
          value={minutes}
          onChange={onValueChange}
          name="duration_minute"
          type="number"
          min="0"
          aria-label={t("duration.minutes")}
          aria-describedby="duration-minutes"
          inputGroupExtra={
            <InputGroup.Text id="duration-minutes">
              {t("duration.minutes")}
            </InputGroup.Text>
          }
        />
      </div>
    </div>
  );
}

Duration.propTypes = {
  label: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Duration;
