import axios from "axios";
const BASE_URL = process.env[`REACT_APP_${process.env.REACT_APP_ENV.toUpperCase()}_BASE_URL`];

export const getUsers = () => {
  return axios.get(BASE_URL + "/user");
};
