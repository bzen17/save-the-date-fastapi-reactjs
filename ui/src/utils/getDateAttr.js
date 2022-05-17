var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const today = new Date();

// get today's day of the week
export const getCurrDay = () => {
  return days[today.getDay()];
};

// get current month in alphabets
export const getCurrMonth = () => {
  return months[today.getMonth()];
};

// get current month index
export const getMonthIndex = (month) => {
  return months.indexOf(month);
};

// get month in alphabets by index
export const getMonth = (month) => {
  return months[month];
};

// get current year
export const getYear = () => {
  return today.getFullYear();
};

// get current date in string DD/MM/YYYY
export const getFullDate = () => {
  return `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
};
