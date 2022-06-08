const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin');

const install = ( on, config) => {
  const reportPortalEnabled = ( config.env.REPORT_PORTAL_ENABLED == true || config.env.REPORT_PORTAL_ENABLED == 'true');
  log(`report portal enabled: ${reportPortalEnabled}`)
  if (reportPortalEnabled) {
      log('Configuring report portal')
      config.reporter = 'cypress-multi-reporters',
      config.reporterOptions = {
        configFile: './reporter-config.json'
      };
      // enable reportPortal plugin
      registerReportPortalPlugin(on, config);
  }
}

function log(message) {
  console.log('[report-portal-plugin] ' +  message)
}

module.exports = {
  install
}