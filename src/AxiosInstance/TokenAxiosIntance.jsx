import axios from "axios";
import { Baseurl } from "../BaseUrl";
const TokenAxiosIntance = axios.create({
  baseURL: `${Baseurl}/api/`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
TokenAxiosIntance.interceptors.request.use(
  function (config) {
    const Data = sessionStorage.getItem("LoginDetails");
    const parsedata = JSON.parse(Data);
    const token = parsedata.Token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
TokenAxiosIntance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default TokenAxiosIntance;
