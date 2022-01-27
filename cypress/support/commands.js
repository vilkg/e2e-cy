import './commands/wait.js'
import './commands/logs.js'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/dhis-web-commons-security/login.action',
    form: true,
    followRedirect: true,
    body: {
      j_username: Cypress.env('login_username'),
      j_password: Cypress.env('login_password')
    },
  }).then((resp) => {
      cy.log(resp)
      Cypress.Cookies.defaults({
        preserve: 'JSESSIONID'
      })
    })
})