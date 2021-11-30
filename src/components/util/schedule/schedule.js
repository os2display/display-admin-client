import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import FormInput from "../forms/form-input";
import Select from "../forms/select";
import { MultiSelect } from "react-multi-select-component";
import { Button, FormGroup } from "react-bootstrap";
import {
  createNewSchedule,
  createScheduleFromRRule,
  getByMonthOptions,
  getByWeekdayOptions,
  getFreqOptions,
  getNextOccurrences,
  getRruleString
} from "./schedule-util";
import Datetime from 'react-datetime';

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
  const [showRRuleDetails, setShowRRuleDetails] = useState(false);

  useEffect(() => {
    const newSchedules = schedules.map((schedule) => createScheduleFromRRule(schedule.id, schedule.duration, schedule.rrule));
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
    newLocalSchedules[index]['rrule'] = getRruleString(newLocalSchedules[index]);
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

  const dateFormat = "LL";

  return (
    <div className="Schedule">
      <Button variant="primary" className="mb-2 mt-2" onClick={addSchedule}>{t('schedule.add-schedule-button-text')}</Button>

      {localSchedules && localSchedules.map((schedule, index) => (
        <div key={schedule.id} className="Schedule-item card m-2">
          <div className="card-header">{t('schedule.plan')} #{index+1}</div>

          <div className="card-body container">
            <div className="row">
              <div className="col">
                <label htmlFor="dtstart">{t('schedule.dtstart')}</label>
                <Datetime name="dtstart" dateFormat={dateFormat} value={schedule.dtstart} onChange={(date) => changeSchedule(schedule.id, "dtstart", date.toDate())} />
              </div>
              <div className="col">
                <label htmlFor="until">{t('schedule.until')}</label>
                <Datetime name="dtstart" dateFormat={dateFormat} value={schedule.until} onChange={(date) => changeSchedule(schedule.id, "until", date.toDate())} />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <Select
                  onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
                  value={schedule.freq}
                  label={t('schedule.freq')}
                  name="freq"
                  options={freqOptions}
                  allowNull={false}
                />
              </div>
              <div className="col">
                <FormGroup>
                  <label htmlFor="byweekday">{t('schedule.byweekday')}</label>
                  <MultiSelect
                    className="mt-2"
                    options={byWeekdayOptions}
                    value={schedule.byweekday ? schedule.byweekday.map((weekdayNumber) => byWeekdayOptions.find((weekDay) => weekDay.value === weekdayNumber)) : []}
                    name="byweekday"
                    labelledBy="Select"
                    onChange={(value) => {
                      changeSchedule(schedule.id, 'byweekday', value.map((v) => v.value))
                    }}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <FormInput
                  label={t('schedule.duration')}
                  value={schedule.duration}
                  onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
                  name="duration"
                  type="number"
                  min="1"
                />
              </div>
              <div className="col">
                <FormInput
                  label={t('schedule.byweekno')}
                  value={schedule.byweekno ?? ''}
                  onChange={({target}) => changeSchedule(schedule.id, target.id, target.value)}
                  name="byweekno"
                  type="number"
                  min="0"
                  max="52"
                />
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
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
              </div>
            </div>
          </div>

          <div className="card-footer container">
            <div className="row">
              <div className="col d-flex justify-content-end">
                <Button className="mt-3 mb-3 me-3" variant="secondary" onClick={() => setShowRRuleDetails(!showRRuleDetails)}>
                  {showRRuleDetails ? t('schedule.hide-details') : t('schedule.show-details')}
                </Button>
                <Button className="mt-3 mb-3" variant="danger" onClick={() => removeSchedule(schedule.id)}>{t('schedule.remove')}</Button>
              </div>
            </div>
            {showRRuleDetails && (
              <div className="row">
                <strong>{t('schedule.rrulestring')}:</strong><span>{schedule.rrule}</span>
                <div className="mt-2">
                  <strong>{t('schedule.next-occurrences')}:</strong>
                  {getNextOccurrences(schedule.rruleObject).map((occurrence) => (<div key={occurrence.key}>{occurrence.text}</div>))}
                </div>
              </div>
            )}
          </div>
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
