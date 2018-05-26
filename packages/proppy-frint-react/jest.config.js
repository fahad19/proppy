module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  testRegex: '\\.spec\\.(js)',
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
