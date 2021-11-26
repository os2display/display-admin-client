import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import FormInput from "../forms/form-input";
import Select from "../forms/select";
import { MultiSelect } from "react-multi-select-component";
import { FormGroup } from "react-bootstrap";
import {
  createNewSchedule,
  getByMonthOptions,
  getByWeekdayOptions,
  getFreqOptions,
  getRruleString
} from "./schedule-util";

/**
 * Schedule component.
 *
 * Built with an offset in https://github.com/jakubroztocil/rrule/blob/master/demo/demo.ts
 *
 * @returns {object} The schedule component
 */
function Schedule({ schedules, onChange }) {
  const { t } = useTranslation("common");
  const [localSchedules, setLocalSchedules] = useState([]);

  useEffect(() => {
    setLocalSchedules(schedules);
  }, [schedules]);

  const addSchedule = () => {
    const newSchedules = [...localSchedules];
    const newSchedule = createNewSchedule();

    newSchedules.push(newSchedule);
    onChange(newSchedules);
  }

  const changeSchedule = (scheduleId, targetId, targetValue) => {
    let value = targetValue;

    // Make sure duration field is an integer.
    switch (targetId) {
      case 'duration':
        const parsedValue = parseInt(targetValue, 10);

        if (isNaN(parsedValue)) {
          return;
        }
        value = parsedValue;
        break;
    }

    const newLocalSchedules = [...localSchedules];
    const index = newLocalSchedules.findIndex((schedule) => schedule.id === scheduleId);
    newLocalSchedules[index][targetId] = value;
    newLocalSchedules[index]['rrule'] = getRruleString(newLocalSchedules[index]);
    onChange(newLocalSchedules);
  }

  const freqOptions = getFreqOptions(t);
  const byWeekdayOptions = getByWeekdayOptions(t);
  const byMonthOptions = getByMonthOptions(t);

  return (
    <div className="Schedule">
      <a href="#" onClick={addSchedule}>{t('schedule.add-schedule-button-text')}</a>
      {localSchedules && localSchedules.map((schedule) => (
        <div key={schedule.id} className="Schedule-item">
          <div>RRule string: {schedule.rrule}</div>

          <Select
            onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
            value={schedule.freq}
            label={t('schedule.freq')}
            name="freq"
            options={freqOptions}
            allowNull={false}
          />

          <FormGroup>
            <label htmlFor="byweekday">{t('schedule.byweekday')}</label>
            <MultiSelect
              options={byWeekdayOptions}
              value={schedule.byweekday}
              name="byweekday"
              labelledBy="Select"
              onChange={(value) => changeSchedule(schedule.id, 'byweekday', value)}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="bymonth">{t('schedule.bymonth')}</label>
            <MultiSelect
              options={byMonthOptions}
              value={schedule.bymonth}
              name="bymonth"
              labelledBy="Select"
              onChange={(value) => changeSchedule(schedule.id, 'bymonth', value)}
            />
          </FormGroup>

          <FormInput
            label={t('schedule.byweekno')}
            value={schedule.byweekno}
            onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
            name="byweekno"
            type="number"
            min="0"
            max="52"
          />

          <FormInput
            label={t('schedule.duration')}
            value={schedule.duration}
            onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
            name="duration"
            type="number"
            min="1"
          />
        </div>
      ))}
    </div>
  );
}

Schedule.propTypes = {
  schedules: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Schedule;
