import RRule from "rrule";
import { ulid } from "ulid";

const getRruleString = (schedule) => {
  const rrule = new RRule({
    wkst: schedule.wkst,
    freq: schedule.freq,
    dtstart: schedule.dtstart,
    until: schedule.until,
    byweekday: schedule.byweekday.map((weekday) => weekday.value),
    bymonth: schedule.bymonth.map((month) => month.value),
    byweekno: schedule.byweekno
  });
  return rrule.toString();
}

const createNewSchedule = () => {
  const newSchedule = {
    id: ulid(new Date().getTime()),
      duration: 0,
    freq: RRule.WEEKLY,
    dtstart: null,
    until: null,
    wkst: RRule.MO,
    byweekday: [],
    bymonth: [],
    byweekno: null
  };
  newSchedule.rrule = getRruleString(newSchedule);
  return newSchedule;
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
    { label: t('schedule.monday'), value: RRule.MO, key: 'rrule.mo' },
    { label: t('schedule.tuesday'), value: RRule.TU, key: 'rrule.tu' },
    { label: t('schedule.wednesday'), value: RRule.WE, key: 'rrule.we' },
    { label: t('schedule.thursday'), value: RRule.TH, key: 'rrule.th' },
    { label: t('schedule.friday'), value: RRule.FR, key: 'rrule.fr' },
    { label: t('schedule.saturday'), value: RRule.SA, key: 'rrule.sa' },
    { label: t('schedule.sunday'), value: RRule.SU, key: 'rrule.su' },
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


export {getFreqOptions, getByWeekdayOptions, getByMonthOptions, createNewSchedule, getRruleString};
