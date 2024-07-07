import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInstance.interceptors.request.use(
  function (config) {
    const token = "dfskldfnsdfnksdfkdsfs";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response && error.response.status === 401) {

    // }
    return Promise.reject(error);
  }
);
export default AxiosInstance;