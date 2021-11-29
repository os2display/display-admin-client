import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import FormInput from "../forms/form-input";
import Select from "../forms/select";
import { MultiSelect } from "react-multi-select-component";
import { Button, FormGroup } from "react-bootstrap";
import {
  createNewSchedule, createScheduleFromRRule,
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
    const newSchedules = schedules.map((schedule) => createScheduleFromRRule(schedule.id, schedule.duration, schedule.rruleString));
    setLocalSchedules(newSchedules);
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
        value = !isNaN(parsedValue) ? parsedValue : 0;
    }

    const newLocalSchedules = [...localSchedules];
    const index = newLocalSchedules.findIndex((schedule) => schedule.id === scheduleId);
    newLocalSchedules[index][targetId] = value;
    newLocalSchedules[index]['rruleString'] = getRruleString(newLocalSchedules[index]);
    onChange(newLocalSchedules);
  }

  const removeSchedule = (scheduleId) => {
    const newLocalSchedules = [...localSchedules].filter((schedule) => schedule.id !== scheduleId);
    setLocalSchedules(newLocalSchedules);
  }

  const getByMonthValue = (value) => {
    if (typeof value === "number") {
      return [value];
    } else if (Array.isArray(value)) {
      return value.map((monthNumber) => byMonthOptions.find((month) => month.value === monthNumber));
    }
    return [];
  }

  const freqOptions = getFreqOptions(t);
  const byWeekdayOptions = getByWeekdayOptions(t);
  const byMonthOptions = getByMonthOptions(t);

  return (
    <div className="Schedule">
      <a href="#" onClick={addSchedule}>{t('schedule.add-schedule-button-text')}</a>
      {localSchedules && localSchedules.map((schedule) => (
        <div key={schedule.id} className="Schedule-item">
          <Button variant="danger" onClick={() => removeSchedule(schedule.id)}>{t('schedule.remove')}</Button>

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
              value={schedule.byweekday ? schedule.byweekday.map((weekdayNumber) => byWeekdayOptions.find((weekDay) => weekDay.value === weekdayNumber)) : []}
              name="byweekday"
              labelledBy="Select"
              onChange={(value) => {
                changeSchedule(schedule.id, 'byweekday', value.map((v) => v.value))
              }}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="bymonth">{t('schedule.bymonth')}</label>
            <MultiSelect
              options={byMonthOptions}
              value={getByMonthValue(schedule.bymonth)}
              name="bymonth"
              labelledBy="Select"
              onChange={(values) => changeSchedule(schedule.id, 'bymonth', values.map((v) => v.value))}
            />
          </FormGroup>

          <FormInput
            label={t('schedule.byweekno')}
            value={schedule.byweekno ?? ''}
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

          <div>RRule string: {schedule.rruleString}</div>
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
