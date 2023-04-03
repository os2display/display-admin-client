import { React, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import { Button, FormGroup } from "react-bootstrap";
import dayjs from "dayjs";
import { RRule } from "rrule";
import utc from "dayjs/plugin/utc";
import FormInput from "../forms/form-input";
import Select from "../forms/select";
import {
  createNewSchedule,
  createScheduleFromRRule,
  getByMonthOptions,
  getByWeekdayOptions,
  getFreqOptions,
  getNextOccurrences,
  getRruleString,
} from "./schedule-util";
import Duration from "./duration";

dayjs.extend(utc);

/**
 * Schedule component.
 *
 * Built with an offset in https://github.com/jakubroztocil/rrule/blob/master/demo/demo.ts
 *
 * @param {object} props The props.
 * @param {Array} props.schedules - The schedules.
 * @param {Function} props.onChange - The change handler for schedules.
 * @returns {object} The schedule component
 */
function Schedule({ schedules, onChange }) {
  const { t } = useTranslation("common");
  const freqOptions = getFreqOptions(t);
  const byWeekdayOptions = getByWeekdayOptions(t);
  const byMonthOptions = getByMonthOptions(t);
  const [localSchedules, setLocalSchedules] = useState([]);
  const [showRRuleDetails, setShowRRuleDetails] = useState(false);

  useEffect(() => {
    const newSchedules = schedules.map((schedule) =>
      createScheduleFromRRule(schedule.id, schedule.duration, schedule.rrule)
    );
    setLocalSchedules(newSchedules);
  }, [schedules]);

  /** Adds a schedule. */
  const addSchedule = () => {
    const newSchedules = [...localSchedules];
    const newSchedule = createNewSchedule();

    newSchedules.push(newSchedule);
    onChange(newSchedules);
  };

  /**
   * Changes a schedule.
   *
   * @param {string} scheduleId - Schedule id.
   * @param {string} targetId - The schedule field to change.
   * @param {any} targetValue - The new value for the field.
   */
  const changeSchedule = (scheduleId, targetId, targetValue) => {
    let value = targetValue;
    let parsedValue;

    // Make sure number fields are an integer.
    if (targetId === "duration") {
      parsedValue = parseInt(targetValue, 10);
      value = !Number.isNaN(parsedValue) ? parsedValue : 0;
    }

    const newLocalSchedules = [...localSchedules];
    const index = newLocalSchedules.findIndex(
      (schedule) => schedule.id === scheduleId
    );
    newLocalSchedules[index][targetId] = value;
    newLocalSchedules[index].rrule = getRruleString(newLocalSchedules[index]);

    onChange(newLocalSchedules);
  };

  /**
   * Remove a schedule.
   *
   * @param {string} scheduleId The id of the schedule to remove.
   */
  const removeSchedule = (scheduleId) => {
    const newLocalSchedules = [...localSchedules].filter(
      (schedule) => schedule.id !== scheduleId
    );
    onChange(newLocalSchedules);
  };

  /**
   * Map month value to month options.
   *
   * @param {number | Array | null} value - The month value.
   * @returns {Array} - The month options.
   */
  const getByMonthValue = (value) => {
    if (typeof value === "number") {
      return [value];
    }
    if (Array.isArray(value)) {
      return value.map((monthNumber) =>
        byMonthOptions.find((month) => month.value === monthNumber)
      );
    }
    return [];
  };

  /**
   * Set date value.
   *
   * @param {string} scheduleId - Schedule id.
   * @param {object} target - Input target.
   */
  const setDateValue = (scheduleId, target) => {
    const date = new Date(target.value);

    const scheduleDate = new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes()
      )
    );

    changeSchedule(scheduleId, target.id, scheduleDate);
  };

  /**
   * Get date value for datetime-local input.
   *
   * @param {Date} date - The date.
   * @returns {string} - The date formatted for datetime-local.
   */
  const getDateValue = (date) => {
    return date ? dayjs(date).utc().format("YYYY-MM-DDTHH:mm") : "";
  };

  /**
   * Creates string og hour/minutes that is padded to 00:00 format.
   *
   * @param {number | null} hour - The UTC hour.
   * @param {number | null} minutes - The UTC minute.
   * @returns {string} - Time values as a string of format HH:mm.
   */
  const getTimeValue = (hour, minutes) => {
    if (hour === undefined || minutes === undefined) return "";

    const paddedHours = `${hour}`.padStart(2, "0");
    const paddedMinutes = `${minutes}`.padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}`;
  };

  /**
   * Set time value for schedule with id.
   *
   * @param {string} scheduleId - Schedule id.
   * @param {object} target - Input target.
   */
  const setTimeValue = (scheduleId, target) => {
    const { value } = target;
    const split = value.split(":");

    changeSchedule(scheduleId, "byhour", parseInt(split[0], 10));
    changeSchedule(scheduleId, "byminute", parseInt(split[1], 10));
  };

  return (
    <div className="Schedule">
      <Button
        variant="primary"
        id="add_schedule"
        className="mb-2 mt-2"
        onClick={addSchedule}
      >
        {t("schedule.add-schedule-button-text")}
      </Button>

      {localSchedules &&
        localSchedules.map((schedule, index) => (
          <div key={schedule.id} className="Schedule-item card mt-2 mb-2">
            <div className="card-header">
              {t("schedule.plan")} #{index + 1}
            </div>

            <div className="card-body container">
              <div className="row">
                <div className="col">
                  <FormInput
                    label={t("schedule.dtstart")}
                    value={getDateValue(schedule.dtstart)}
                    name="dtstart"
                    onChange={({ target }) => setDateValue(schedule.id, target)}
                    type="datetime-local"
                  />
                </div>
                <div className="col">
                  <FormInput
                    label={t("schedule.until")}
                    value={getDateValue(schedule.until)}
                    name="until"
                    onChange={({ target }) => setDateValue(schedule.id, target)}
                    type="datetime-local"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <Duration
                    duration={schedule.duration}
                    onChange={(newValue) => {
                      changeSchedule(schedule.id, "duration", newValue);
                    }}
                    label={t("schedule.duration")}
                  />
                </div>
                <div className="col">
                  <FormInput
                    onChange={({ target }) => setTimeValue(schedule.id, target)}
                    value={getTimeValue(schedule.byhour, schedule.byminute)}
                    label={t("schedule.bytime")}
                    type="time"
                    name="bytime"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <Select
                    onChange={({ target }) =>
                      changeSchedule(schedule.id, target.id, target.value)
                    }
                    value={schedule.freq}
                    label={t("schedule.freq")}
                    name="freq"
                    options={freqOptions}
                    allowNull={false}
                  />
                </div>
                <div className="col">
                  <FormGroup>
                    <label htmlFor="byweekday">{t("schedule.byweekday")}</label>
                    <MultiSelect
                      className="mt-2"
                      options={byWeekdayOptions}
                      value={
                        schedule.byweekday
                          ? schedule.byweekday.map((weekdayNumber) =>
                              byWeekdayOptions.find(
                                (weekDay) => weekDay.value === weekdayNumber
                              )
                            )
                          : []
                      }
                      name="byweekday"
                      disableSearch
                      overrideStrings={{
                        allItemsAreSelected: t("schedule.all-selected"),
                        clearSelected: t("schedule.clear-selection"),
                        selectAll: t("schedule.selected-all"),
                        selectSomeItems: t("schedule.select-some-options"),
                      }}
                      labelledBy="Select"
                      onChange={(value) => {
                        changeSchedule(
                          schedule.id,
                          "byweekday",
                          value.map((v) => v.value)
                        );
                      }}
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <FormGroup>
                    <label htmlFor="bymonth" className="mb-2">
                      {t("schedule.bymonth")}
                    </label>
                    <MultiSelect
                      options={byMonthOptions}
                      value={getByMonthValue(schedule.bymonth)}
                      name="bymonth"
                      disableSearch
                      labelledBy="Select"
                      overrideStrings={{
                        allItemsAreSelected: t("schedule.all-selected"),
                        clearSelected: t("schedule.clear-selection"),
                        selectAll: t("schedule.selected-all"),
                        selectSomeItems: t("schedule.select-some-options"),
                      }}
                      onChange={(values) =>
                        changeSchedule(
                          schedule.id,
                          "bymonth",
                          values.map((v) => v.value)
                        )
                      }
                    />
                  </FormGroup>
                </div>
                <div className="col">
                  <FormInput
                    disabled={schedule.freq !== RRule.YEARLY}
                    label={t("schedule.byweekno")}
                    value={schedule.byweekno ?? ""}
                    onChange={({ target }) =>
                      changeSchedule(schedule.id, target.id, target.value)
                    }
                    name="byweekno"
                    type="number"
                    min="0"
                    max="52"
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="row">
                <div className="col d-flex justify-content-end">
                  <Button
                    id="schedule_details_button"
                    className="mt-2 mb-2 me-2"
                    variant="secondary"
                    onClick={() => setShowRRuleDetails(!showRRuleDetails)}
                  >
                    {showRRuleDetails
                      ? t("schedule.hide-details")
                      : t("schedule.show-details")}
                  </Button>
                  <Button
                    className="mt-2 mb-2"
                    variant="danger"
                    onClick={() => removeSchedule(schedule.id)}
                  >
                    {t("schedule.remove")}
                  </Button>
                </div>
              </div>
              {showRRuleDetails && (
                <div id="schedule_details" className="row">
                  <strong>{t("schedule.rrulestring")}:</strong>
                  <span>{schedule.rrule}</span>
                  <div className="mt-2">
                    <strong>{t("schedule.next-occurrences")}:</strong>
                    {getNextOccurrences(schedule.rruleObject).map(
                      (occurrence) => (
                        <div key={occurrence.key}>{occurrence.text}</div>
                      )
                    )}
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
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      rrule: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Schedule;
