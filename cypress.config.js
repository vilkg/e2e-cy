const { defineConfig } = require('cypress')

module.exports = defineConfig({
  requestTimeout: 20000,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  video: false,
  projectId: 'dhis2-e2e',
  env: {
    REPORT_PORTAL_ENABLED: false,
    JIRA_ENABLED: true,
    LOGIN_USERNAME: 'admin',
    LOGIN_PASSWORD: 'district',
    allure: 'true'
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-parallel/json-stream.reporter.js, reporters/jira/reporter.js, @reportportal/agent-js-cypress',
    reportersJiraReporterJsReporterOptions: {
      isEnabled: process.env.JIRA_ENABLED,
      jiraUrl: 'https://jira.dhis2.org',
      username: process.env.JIRA_USERNAME,
      password: process.env.JIRA_PASSWORD,
      projectId: "10000",
      testCycle: 'automated-tests',
      versionName: process.env.JIRA_RELEASE_VERSION_NAME
    },
    reportportalAgentJsCypressReporterOptions: {
      endpoint: "https://test.tools.dhis2.org/reportportal/api/v1",
      token: process.env.RP_TOKEN,
      launch: "e2e_tests_master",
      project: "dhis2_auto",
      description: "",
      attributes: [
        {
           "key": "version",
           "value": "master"
        }
      ],
      debug: true,
      parallel: true,
      autoMerge: true,
      restClientConfig: {
        timeout: 90000
      }
    },
  },
  numTestsKeptInMemory: 0,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://smoke.dhis2.org/dev_smoke',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    experimentalSessionAndOrigin: true,
  },
})
