module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
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
