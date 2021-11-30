import RRule, { Weekday } from "rrule";
import { ulid } from "ulid";
import moment from "moment";

const getRruleString = (schedule) => {
  const rrule = new RRule({
    wkst: schedule.wkst,
    freq: schedule.freq,
    dtstart: schedule.dtstart,
    until: schedule.until,
    byweekday: schedule.byweekday,
    bymonth: schedule.bymonth,
    byweekno: schedule.byweekno
  });

  return rrule.toString();
}

const createNewSchedule = () => {
  const newSchedule = {
    id: ulid(new Date().getTime()),
    duration: 60 * 60 * 24, // Default one day.
    freq: RRule.WEEKLY,
    dtstart: new Date(),
    until: null,
    wkst: 0,
    byweekday: [],
    bymonth: [],
    byweekno: ''
  };
  newSchedule.rrule = getRruleString(newSchedule);

  return newSchedule;
}

const createScheduleFromRRule = (id, duration, rruleString) => {
  const rrule = RRule.fromString(rruleString.replace("\\n", " "));
  const options = {...rrule.origOptions};

  // Transform Weekday entries to weekday numbers.
  if (options.byweekday) {
    options.byweekday = options.byweekday.map((weekday) => {
      return weekday instanceof Weekday ? weekday.weekday : weekday
    } );
  }

  if (Object.prototype.hasOwnProperty.call(options, 'bymonth') && !Array.isArray(options.bymonth)) {
    options.bymonth = [options.bymonth];
  }

  options.id = id;
  options.duration = duration;
  options.rrule = rruleString;
  options.rruleObject = rrule;

  return options;
}

const getNextOccurrences = (rrule, count = 5) => {
  const occurrences = [];

  const newRrule = new RRule(rrule.origOptions);
  newRrule.options.count = count;
  newRrule.all(d => {
    occurrences.push({
      key: "occurrence" + occurrences.length,
      text: moment(d).format("LLLL")
    });
    return true;
  });
  return occurrences;
}

const getFreqOptions = (t) => {
  return [
    { title: t('schedule.yearly'), value: RRule.YEARLY, key: 'rrule.yearly' },
    { title: t('schedule.monthly'), value: RRule.MONTHLY, key: 'rrule.monthly' },
    { title: t('schedule.weekly'), value: RRule.WEEKLY, key: 'rrule.weekly' },
    { title: t('schedule.daily'), value: RRule.DAILY, key: 'rrule.daily' },
    { title: t('schedule.hourly'), value: RRule.HOURLY, key: 'rrule.hourly' },
    { title: t('schedule.minutely'), value: RRule.MINUTELY, key: 'rrule.minutely' },
  ];
}

const getByWeekdayOptions = (t) => {
  return [
    { label: t('schedule.monday'), value: 0, key: 'rrule.mo' },
    { label: t('schedule.tuesday'), value: 1, key: 'rrule.tu' },
    { label: t('schedule.wednesday'), value: 2, key: 'rrule.we' },
    { label: t('schedule.thursday'), value: 3, key: 'rrule.th' },
    { label: t('schedule.friday'), value: 4, key: 'rrule.fr' },
    { label: t('schedule.saturday'), value: 5, key: 'rrule.sa' },
    { label: t('schedule.sunday'), value: 6, key: 'rrule.su' },
  ];
}

const getByMonthOptions = (t) => {
  return [
    { label: t('schedule.jan'), value: 1, key: 'rrule.january' },
    { label: t('schedule.feb'), value: 2, key: 'rrule.february' },
    { label: t('schedule.mar'), value: 3, key: 'rrule.march' },
    { label: t('schedule.apr'), value: 4, key: 'rrule.april' },
    { label: t('schedule.may'), value: 5, key: 'rrule.may' },
    { label: t('schedule.jun'), value: 6, key: 'rrule.june' },
    { label: t('schedule.jul'), value: 7, key: 'rrule.july' },
    { label: t('schedule.aug'), value: 8, key: 'rrule.august' },
    { label: t('schedule.sep'), value: 9, key: 'rrule.september' },
    { label: t('schedule.oct'), value: 10, key: 'rrule.october' },
    { label: t('schedule.nov'), value: 11, key: 'rrule.november' },
    { label: t('schedule.dec'), value: 12, key: 'rrule.december' },
  ];
}


export {getFreqOptions, getByWeekdayOptions, getByMonthOptions, createNewSchedule, getRruleString, createScheduleFromRRule, getNextOccurrences};
