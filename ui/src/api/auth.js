import HEADER from "./header";
import axios from "axios";
const FormData = require("form-data");
/* require('dotenv').config();
const BASE_URL = process.env.REACT_APP_BASE_URL; */
const BASE_URL = "http://127.0.0.1:8000";

export const login = (data) => {
  const url = BASE_URL + "/auth/login";
  const form = new FormData();
  form.append("username", data.username);
  form.append("password", data.password);
  return axios.post(url, form);
};

export const signup = (data) => {
  const url = BASE_URL + "/auth/signup";
  return axios.post(url, data);
};

export const getCurrentUser = () => {
  const url = BASE_URL + "/auth/me";
  return axios.get(url, HEADER);
};
