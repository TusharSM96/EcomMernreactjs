import axios from "axios";
const TokenAxiosIntance = axios.create({
  baseURL: "http://localhost:8080/api/",
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
