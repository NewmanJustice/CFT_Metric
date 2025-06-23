// jest.config.backend.cjs
module.exports = {
  displayName: 'backend',
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>/test/backend', '<rootDir>/backend'],
  testMatch: ['**/test/backend/**/*.test.(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'backend/tsconfig.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['backend/**/*.{ts,js}', '!**/node_modules/**'],
  coverageDirectory: 'coverage/backend',
  verbose: true,
};
