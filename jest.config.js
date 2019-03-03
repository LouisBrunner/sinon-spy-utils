module.exports = {
  collectCoverage: true,
  coverageReporters: process.env.CI ? ['lcov'] : ['text', 'text-summary', 'html'], // eslint-disable-line no-process-env
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  verbose: true,
  notify: true,
  notifyMode: 'failure-success',
};
