const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"  // 🔹 Permite usar "@/" como alias de "src/"
  },
};

module.exports = createJestConfig(customJestConfig);
