/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: 'src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/../test/$1',
  },
}