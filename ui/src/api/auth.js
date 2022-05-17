import HEADER from "./header";
import axios from "axios";
const FormData = require("form-data");

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const login = (data) => {
  const url = BASE_URL + "/auth/login";
  const form = new FormData();
  form.append("username", data.username);
  form.append("password", data.password);
  return axios.post(url, form, HEADER);
};

export const signup = (data) => {
  const url = BASE_URL + "/auth/signup";
  return axios.post(url, data, HEADER);
};

export const getCurrentUser = () => {
  const url = BASE_URL + "/auth/me";
  return axios.get(url, HEADER);
};
