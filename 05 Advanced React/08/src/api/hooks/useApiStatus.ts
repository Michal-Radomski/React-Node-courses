import React from "react";

import { IDLE, defaultApiStatuses } from "../../constants/api-status";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const prepareStatuses = (currentStatus: string) => {
  const statuses = {} as { isError: boolean; isIdle: boolean; isPending: boolean; isSuccess: boolean };

  for (const status of defaultApiStatuses) {
    const normalizedStatus = capitalize(status.toLowerCase());
    const normalizedStatusKey = `is${normalizedStatus}`;
    statuses[normalizedStatusKey as keyof typeof statuses] = status === currentStatus;
  }

  // console.log("statuses:", statuses);
  return statuses;
};

export const useApiStatus = (currentStatus = IDLE) => {
  const [status, setStatus] = React.useState<string>(currentStatus);

  const statuses = React.useMemo(() => prepareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};
