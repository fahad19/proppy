module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '\\.spec\\.(ts|tsx)',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'node',
  ],
  collectCoverage: false,
  bail: true,
};
