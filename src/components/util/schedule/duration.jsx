import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormInput from "../forms/form-input";
import { useTranslation } from "react-i18next";
import { InputGroup } from "react-bootstrap";

function Duration({ label, duration, onChange }) {
  const { t } = useTranslation("common");
  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();

  const onValueChange = ({target}) => {
    if (target.id === 'duration_hour') {
      onChange(minutes * 60 + parseInt(target.value) * 3600);
    }
    else if (target.id === 'duration_minute') {
      onChange(parseInt(target.value) * 60 + hours * 3600);
    }
  }

  useEffect(() => {
    if (duration) {
      const seconds = duration % 60;
      const durationWithoutSeconds = duration - seconds;
      const minutes = durationWithoutSeconds / 60;
      const minutesLeft = minutes % 60;
      const hours = (durationWithoutSeconds - minutesLeft * 60) / 3600;

      setHours(hours);
      setMinutes(minutesLeft);
    }
  }, [duration])

  return (
    <div className="row">
      <label className="mb-2">{label}</label>
      <div className="col">
        <FormInput
          label={null}
          value={hours}
          onChange={onValueChange}
          name="duration_hour"
          type="number"
          aria-label={t("duration.hours")}
          aria-describedby="duration-hours"
          inputGroupExtra={<InputGroup.Text id="duration-hours">{t("duration.hours")}</InputGroup.Text>}
        />
      </div>
      <div className="col">
        <FormInput
          label={null}
          value={minutes}
          onChange={onValueChange}
          name="duration_minute"
          type="number"
          aria-label={t("duration.minutes")}
          aria-describedby="duration-minutes"
          inputGroupExtra={<InputGroup.Text id="duration-minutes">{t("duration.minutes")}</InputGroup.Text>}
        />
      </div>
    </div>
  );
}

Duration.propTypes = {
  label: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Duration;
