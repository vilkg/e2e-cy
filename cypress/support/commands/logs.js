const excludedErrors = [
  'status of 404', 'userDataStore/', 'staticContent/logo_banner', 
  'userSettings.json?', 'MIME type', "manifest.json", 
  'Failed to fetch', 'cacheManifest.action', 
  'i18nJavaScript.action', 'files/script'
];

Cypress.Commands.add('getConsoleLogs', () => {
  cy.task('log-to-output:getLogs').then( (logs) => {
    return logs.filter((log) => {
      // excluding errors that are either known issues or expected under certain db states
      return !excludedErrors.some( (excl) => {
        return log.includes(excl)
      })
    });
  })
})

Cypress.Commands.add('clearConsoleLogs', () => {
  cy.task('log-to-output:clearLogs');
})

