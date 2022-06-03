const { defineConfig } = require('cypress')

module.exports = defineConfig({
  requestTimeout: 20000,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  video: false,
  env: {
    REPORT_PORTAL_ENABLED: 'false',
    login_username: 'admin',
    login_password: 'district',
    allure: 'true',
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
