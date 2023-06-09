import axios from "axios";
import HEADER from "./header";

const BASE_URL = process.env[`REACT_APP_${process.env.REACT_APP_ENV.toUpperCase()}_BASE_URL`];

export const addEvent = (data) => {
  const url = BASE_URL + "/event";
  return axios.post(url, data, HEADER);
};

export const getAllUserEvents = () => {
  const url = BASE_URL + `/event`;
  return axios.get(url, HEADER);
};

export const getCurrentMonthUserEvents = (day, month) => {
  const url = BASE_URL + `/event?day=${day}&month=${month}`;
  return axios.get(url, HEADER);
};
export const getUpcomingUserEvents = (month, upcoming) => {
  const url = BASE_URL + `/event?month=${month}&upcoming=${upcoming}`;
  return axios.get(url, HEADER);
};
