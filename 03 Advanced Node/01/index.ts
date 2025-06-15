const startTime: [number, number] = process.hrtime(); // result in [seconds, nanoseconds]
console.log("process.argv:", process.argv);
const endTime: [number, number] = process.hrtime(startTime);

console.log("endtime:", endTime, endTime?.[1] / 1000000); // Last number in milliseconds

console.log("__filename, __dirname:", __filename, __dirname);

console.log("module:", module);

const req = require("module").wrapper.toString();
console.log({ req });

console.log("require.resolve:", require.resolve);

console.log("require:", require);
console.log("require.extensions:", require.extensions);
