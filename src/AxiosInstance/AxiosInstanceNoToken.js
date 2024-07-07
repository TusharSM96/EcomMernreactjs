import axios from "axios";
const AxiosInstanceNoToken = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInstanceNoToken.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
AxiosInstanceNoToken.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default AxiosInstanceNoToken;
