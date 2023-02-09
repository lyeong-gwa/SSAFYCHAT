import axios, { AxiosRequestConfig } from "axios";

// axios 객체 생성
// localServer 통신
function localServer() {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: "https://ssafychat.shop/api",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
  const instance = axios.create(axiosConfig);
  return instance;
}

export { localServer };
