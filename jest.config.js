module.exports = {
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/api/config',
    '/lib',
    '__fixtures__',
  ],
  coveragePathIgnorePatterns: ['__fixtures__'],
};
