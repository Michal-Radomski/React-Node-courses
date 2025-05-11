const { parentPort } = require("worker_threads");

// console.log({ parentPort });

parentPort.on("message", () => {
  let counter = 0;
  while (counter < 1e9) {
    counter++;
  }

  parentPort.postMessage("" + counter);
});
