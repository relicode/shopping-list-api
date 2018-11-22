module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@functions/(.*)": "<rootDir>/src/functions/$1",
    "^@services/(.*)": "<rootDir>/src/services/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1"
  },
}
