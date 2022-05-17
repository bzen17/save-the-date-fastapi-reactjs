import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUsers = () => {
  return axios.get(BASE_URL+"/user");
};
