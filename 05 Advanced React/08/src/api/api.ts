import axios, { type AxiosInstance } from "axios";

const axiosParams = {
  // Base URL should be set via environment
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/",
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config = {}) => axios.get(url, config),
    delete: (url: string, config = {}) => axios.delete(url, config),
    post: (url: string, body: ObjectI, config = {}) => axios.post(url, body, config),
    patch: (url: string, body: ObjectI, config = {}) => axios.patch(url, body, config),
    put: (url: string, body: ObjectI, config = {}) => axios.put(url, body, config),
  };
};

export default api(axiosInstance);
