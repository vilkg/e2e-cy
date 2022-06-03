// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<any>
    /**
     * Custom command to login
     * @param username=admin
     * @param password=district
     * @example cy.login('username', 'password')
     */
    login(
      username: String,
      password: String
    ): Chainable<Element>
  }
}
