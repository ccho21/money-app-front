export const WEEKDAY_OPTIONS = [
  { label: 'Sunday', value: 'sunday' },
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
] as const;

export const INPUT_ORDER_OPTIONS = [
  { label: 'From Amount', value: 'amount-first' },
  { label: 'From Account', value: 'account-first' },
] as const;

export const START_SCREEN_OPTIONS = [
  { label: 'Daily View', value: 'daily' },
  { label: 'Calendar View', value: 'calendar' },
] as const;

export const ACCOUNT_GROUP_OPTIONS = [
  { label: 'CASH', value: 'CASH' },
  { label: 'BANK', value: 'BANK' },
  { label: 'CARD', value: 'CARD' },
];
