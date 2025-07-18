export const randomExpensiveOperation = (): void => {
  function wait(): void {
    const start = new Date();
    // Empty while loop until the required amount of time has passed
    while ((new Date().getTime() - start.getTime()) / 1000 < 0.5);
  }
  wait();
};
