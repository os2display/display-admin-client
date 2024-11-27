import { RRule, Weekday } from "rrule";
import { ulid } from "ulid";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/da";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(localizedFormat);

/**
 * Get rrule string from schedule.
 *
 * @param {object} schedule - The schedule.
 * @returns {string} - RRule string.
 */
const getRruleString = (schedule) => {
  // If bysecond is set, use that. Otherwise, if byhour or minute is set default to 0.
  let bysecond = schedule.bysecond ?? null;
  if (!bysecond) {
    bysecond = schedule.byhour || schedule.byminute ? 0 : null;
  }

  // Make sure weekno is only set if freq is yearly.
  let byweekno = null;
  if (schedule.freq === RRule.YEARLY) {
    byweekno = schedule.byweekno;
  }

  const rrule = new RRule({
    wkst: schedule.wkst ?? RRule.MO,
    freq: schedule.freq,
    dtstart: schedule.dtstart,
    count: schedule.count,
    until: schedule.until,
    interval: schedule.interval,
    byhour: schedule.byhour,
    byminute: schedule.byminute,
    bysecond,
    byweekday: schedule.byweekday,
    bymonth: schedule.bymonth,
    byweekno,
  });

  return rrule.toString();
};

/**
 * Create a new schedule.
 *
 * @returns {object} - The new schedule.
 */
const createNewSchedule = () => {
  const now = new Date();
  const nowTimestamp = now.getTime();

  const newSchedule = {
    id: ulid(nowTimestamp),
    duration: 60 * 60, // Default 1 hour.
    freq: RRule.DAILY,
    count: 1,
    interval: null,
    // For evaluation with the RRule library we pretend that "now" is in UTC instead of the local timezone.
    // That is 9:00 in Europe/Copenhagen time will be evaluated as if it was 9:00 in UTC.
    // @see https://github.com/jkbrzt/rrule#important-use-utc-dates
    dtstart: new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      )
    ),
    until: null,
    wkst: RRule.MO,
    byhour: null,
    byminute: null,
    byweekday: [],
    bymonth: [],
    byweekno: "",
  };
  newSchedule.rrule = getRruleString(newSchedule);

  return newSchedule;
};

/**
 * Create a schedule object from rrule.
 *
 * @param {string} id - The id.
 * @param {number} duration - The duration.
 * @param {string} rruleString - The rrule string.
 * @returns {object} - The schedule.
 */
const createScheduleFromRRule = (id, duration, rruleString) => {
  const rrule = RRule.fromString(rruleString.replace("\\n", "\n"));
  const options = { ...rrule.origOptions };

  // Transform Weekday entries to weekday numbers.
  if (options.byweekday) {
    options.byweekday = options.byweekday.map((weekday) => {
      return weekday instanceof Weekday ? weekday.weekday : weekday;
    });
  }

  if (
    Object.prototype.hasOwnProperty.call(options, "bymonth") &&
    !Array.isArray(options.bymonth)
  ) {
    options.bymonth = [options.bymonth];
  }

  options.id = id;
  options.duration = duration;
  options.rrule = rruleString;
  options.rruleObject = rrule;

  return options;
};

/**
 * Get array of count occurrences of rrule.
 *
 * @param {RRule} rrule - The rrule.
 * @param {number} duration - The duration of an occurrence in seconds.
 * @param {number} count - The max number of occurrences.
 * @returns {Array} - The occurrences.
 */
const getNextOccurrences = (rrule, duration = 0, count = 5) => {
  const occurrences = [];

  const newRrule = new RRule(rrule.origOptions);
  newRrule.options.count = count;
  newRrule.all((d) => {
    occurrences.push({
      key: `occurrence${occurrences.length}`,
      text: dayjs(d).utc().locale("da").format("LLLL"),
      end: dayjs(d).utc().add(duration, "second").locale("da").format("LLLL"),
    });
    return true;
  });

  return occurrences;
};

/**
 * Get frequency options.
 *
 * @param {Function} t - The translation function.
 * @returns {Array} - The options.
 */
const getFreqOptions = (t) => {
  return [
    { title: t("schedule.yearly"), value: RRule.YEARLY, key: "rrule.yearly" },
    {
      title: t("schedule.monthly"),
      value: RRule.MONTHLY,
      key: "rrule.monthly",
    },
    { title: t("schedule.weekly"), value: RRule.WEEKLY, key: "rrule.weekly" },
    { title: t("schedule.daily"), value: RRule.DAILY, key: "rrule.daily" },
  ];
};

/**
 * Get weekday options.
 *
 * @param {Function} t - The translation function.
 * @returns {Array} - The options.
 */
const getByWeekdayOptions = (t) => {
  return [
    { label: t("schedule.monday"), value: 0, key: "rrule.mo" },
    { label: t("schedule.tuesday"), value: 1, key: "rrule.tu" },
    { label: t("schedule.wednesday"), value: 2, key: "rrule.we" },
    { label: t("schedule.thursday"), value: 3, key: "rrule.th" },
    { label: t("schedule.friday"), value: 4, key: "rrule.fr" },
    { label: t("schedule.saturday"), value: 5, key: "rrule.sa" },
    { label: t("schedule.sunday"), value: 6, key: "rrule.su" },
  ];
};

/**
 * Get month options.
 *
 * @param {Function} t - The translation function.
 * @returns {Array} - The options.
 */
const getByMonthOptions = (t) => {
  return [
    { label: t("schedule.jan"), value: 1, key: "rrule.january" },
    { label: t("schedule.feb"), value: 2, key: "rrule.february" },
    { label: t("schedule.mar"), value: 3, key: "rrule.march" },
    { label: t("schedule.apr"), value: 4, key: "rrule.april" },
    { label: t("schedule.may"), value: 5, key: "rrule.may" },
    { label: t("schedule.jun"), value: 6, key: "rrule.june" },
    { label: t("schedule.jul"), value: 7, key: "rrule.july" },
    { label: t("schedule.aug"), value: 8, key: "rrule.august" },
    { label: t("schedule.sep"), value: 9, key: "rrule.september" },
    { label: t("schedule.oct"), value: 10, key: "rrule.october" },
    { label: t("schedule.nov"), value: 11, key: "rrule.november" },
    { label: t("schedule.dec"), value: 12, key: "rrule.december" },
  ];
};

export {
  getFreqOptions,
  getByWeekdayOptions,
  getByMonthOptions,
  createNewSchedule,
  getRruleString,
  createScheduleFromRRule,
  getNextOccurrences,
};
