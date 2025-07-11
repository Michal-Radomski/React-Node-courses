/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosParams = {
  // Base URL should be set via environment
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "/",
};

const axiosInstance: AxiosInstance = axios.create(axiosParams);

export const didAbort = (error: CustomError) => axios.isCancel(error) && { aborted: true };

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: CustomError) => axios.isAxiosError(error);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const withAbort = (fn: Function) => {
  const executor = async (...args: any[]) => {
    // console.log("args:", args);
    const originalConfig = args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      // console.log("abort:", abort);
      const { cancel, token } = getCancelSource();
      // console.log("token:", token);
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

const withLogger = async (promise: Promise<any>) =>
  promise.catch((error) => {
    /*
     *Always log errors in dev environment
     *if (process.env.NODE_ENV !== 'development') throw error
     */

    // Log error only if VITE_APP_DEBUG_API env is set to true
    if (!import.meta.env.VITE_APP_DEBUG_API) {
      throw error;
    }
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log("error.config:", error.config);
    throw error;
  });

const api = (axios: AxiosInstance) => {
  return {
    get: (url: string, config = {}) => withLogger(withAbort(axios.get)(url, config)),
    delete: (url: string, config = {}) => withLogger(withAbort(axios.delete)(url, config)),
    post: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) =>
      withLogger(withAbort(axios.post)(url, body, config)),
    patch: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) =>
      withLogger(withAbort(axios.patch)(url, body, config)),
    put: (url: string, body: ObjectI, config = {} as AxiosRequestConfig<any>) =>
      withLogger(withAbort(axios.put)(url, body, config)),
  };
};

export default api(axiosInstance);
