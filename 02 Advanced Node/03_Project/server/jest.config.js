/** @type {import('ts-jest').JestConfigWithTsJest} */

const SECOND = 1000;

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20 * SECOND,
};
