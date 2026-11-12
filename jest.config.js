module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],

  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports/junit',
      outputName: 'jest-results.xml',
      ancestorSeparator: ' › ',
      usePathForSuiteName: 'true',
    }],
  ],

  coverageDirectory: 'coverage/jest',
  coverageReporters: ['lcov', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/environments/**',
  ],
};
