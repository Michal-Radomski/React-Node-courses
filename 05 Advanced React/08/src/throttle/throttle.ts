// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const throttle = (fn: Function, wait: number) => {
  let timerId: number;
  let inThrottle: boolean;
  let lastTime: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (!inThrottle) {
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn(...args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
