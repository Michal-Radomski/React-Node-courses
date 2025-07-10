import React from "react";

import { useApiStatus } from "./useApiStatus";
import { PENDING, SUCCESS, ERROR } from "../../constants/api-status";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useApi(fn: Function, config = {}) {
  // console.log("fn:", fn);

  const { initialData } = config as { initialData: ObjectI[] };

  const [data, setData] = React.useState<ObjectI[]>(initialData);
  const [error, setError] = React.useState<Error | null>(null);

  const { status, setStatus, ...normalizedStatuses } = useApiStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exec = async (...args: any[]) => {
    // console.log("args:", args);

    try {
      setStatus(PENDING);
      const data = (await fn(...args)) as ObjectI[];
      setData(data);
      setStatus(SUCCESS);
      return {
        data,
        error: null,
      };
    } catch (error) {
      setError(error as Error);
      setStatus(ERROR);
      return {
        error,
        data: null,
      };
    }
  };

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalizedStatuses,
  };
}
