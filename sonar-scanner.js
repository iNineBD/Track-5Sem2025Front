// sonar-scanner.js
const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://144.22.212.19:9001',
    token: process.env.SONAR2_TOKEN,
    options: {
      'sonar.projectKey': 'Track5Front',
      'sonar.sources': '.',
      'sonar.exclusions': '**/*.spec.ts,**/*.test.ts,**/node_modules/**',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  () => process.exit()
);
