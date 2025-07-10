/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosParams = {
  // Base URL should be set via environment
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/",
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

export const didAbort = (error: CustomError) => axios.isCancel(error) && { aborted: true };

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: CustomError) => axios.isAxiosError(error);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const withAbort = (fn: Function) => {
  const executor = async (...args: any[]) => {
    const originalConfig = args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      console.log("api error", error);

      if (didAbort(error as CustomError)) {
        (error as CustomError).aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config = {}) => withAbort(axios.get)(url, config),
    delete: (url: string, config = {}) => withAbort(axios.delete)(url, config),
    post: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) => withAbort(axios.post)(url, body, config),
    patch: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) => withAbort(axios.patch)(url, body, config),
    put: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) => withAbort(axios.put)(url, body, config),
  };
};

export default api(axiosInstance);
