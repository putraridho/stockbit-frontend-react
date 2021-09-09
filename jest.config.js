const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  roots: ['src'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['src/store', 'src/slices', 'main.jsx'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
};
