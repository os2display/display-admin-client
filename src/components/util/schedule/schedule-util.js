import RRule from "rrule";

const getDay = (i) => [
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
  RRule.SU
][i];

export {getDay};
