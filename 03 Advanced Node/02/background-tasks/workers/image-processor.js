/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const { compressImage } = require("../../utils/sharp");

module.exports = async (job) => {
  const { file, fileName } = job.data;
  await compressImage(file.buffer, fileName);
};
