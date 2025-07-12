import type { AxiosRequestConfig } from "axios";

import api from "./api";

const URLS = {
  getMeal: "search.php",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchMeals = (query: string, config?: AxiosRequestConfig<any>): Promise<any> => {
  return api
    .get(URLS.getMeal, {
      baseURL: "https://www.themealdb.com/api/json/v1/1/",
      params: {
        s: query,
      },
      ...config,
    })
    .then((res) => res.data.meals);
};
