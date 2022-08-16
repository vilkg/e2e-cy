const registerReportPortalPlugin = require('@reportportal/agent-js-cypress/lib/plugin');

const install = ( on, config) => {
  const reportPortalEnabled = ( config.env.REPORT_PORTAL_ENABLED == true || config.env.REPORT_PORTAL_ENABLED == 'true');
  log(`report portal enabled: ${reportPortalEnabled}`)
  if (!reportPortalEnabled) {
      config.reporterOptions.reportportalAgentJsCypressReporterOptions = {}

      var reporters = config.reporterOptions.reporterEnabled.trim().split(',')
        .filter(reporter => {
          return !reporter.includes('reportportal')
        })

      config.reporterOptions.reporterEnabled = reporters.join(',')
      
      return config;
  }

  log('registering commands')
  registerReportPortalPlugin(on, config);
}

function log(message) {
  console.log('[report-portal-plugin] ' +  message)
}

module.exports = {
  install
}