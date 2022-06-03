import './commands/wait.js'
import './commands/logs.js'
//require('@reportportal/agent-js-cypress/lib/commands/reportPortalCommands');

Cypress.Commands.add('login', () => {
  const username = Cypress.env('login_username');
  const password = Cypress.env('login_password');
  cy.session([ username, password ], () => {
    cy.request({
      method: 'POST',
      url: '/dhis-web-commons-security/login.action',
      form: true,
      followRedirect: true,
      body: {
        j_username: username,
        j_password: password
      },
    }).then((resp) => {
        cy.log(resp)
      })
  })
})