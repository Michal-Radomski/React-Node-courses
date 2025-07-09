import type { ComponentType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const delay = (data: any, interval: number): Promise<{ default: ComponentType<any> }> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, interval);
  });
};

export default delay;
