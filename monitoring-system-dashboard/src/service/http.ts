import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { message } from "antd";
import { useUserStore } from "@/store/user";

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().token;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config, "conf");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, 'rrrr')
    return response;
  },
  (error) => {
    console.log(error, 'r')
    if(error.status === 401) {
      window.location.href = "/login";
return Promise.reject(error);
    }
    const msg = error?.response?.data?.message || "请求失败";
    message.error(msg);
    return Promise.reject(error);
  }
);

export default http;
