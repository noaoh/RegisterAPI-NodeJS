module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.ts'],
  automock: false,
  setupFiles: [
          "./setupJest.ts"
  ]
};
