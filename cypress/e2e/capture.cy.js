/// <reference types="cypress" />

import { openApp, 
  fillEventForm,
  addComment,
  openEvent,
  Selectors,
  ContextActions,
  openLastSavedEvent,
  getCommentByValue
} from '../utils/capture'

describe('Capture', () => {
  beforeEach(() => {
    openApp();
    //selectOrgUnitByName('Ngelehun CHC');
    //selectProgramByName('Information Campaign')
  })
  /*it('should delete events', () => {
      selectOrgUnitByName('Ngelehun CHC');
      selectProgramByName('Information Campaign')
  })*/

  it('should open new event form', () => {
    ContextActions.selectOrgUnitByName('Ngelehun CHC')
    ContextActions.selectProgramByName('Information Campaign')
    cy
      .get(Selectors.NEW_EVENT_BUTTON)
      .click()
      .get(Selectors.NEW_EVENT_IN_SELECTED_PROGRAM_BUTTON)
      .click()

  
    cy.location('href').should('contain', '/new');
    //expect('loc.pathname').to.contain('new');

  })
  it('should create event', () => {
    const comment = "Test comment";
    cy.visit('dhis-web-capture/index.html#/new?orgUnitId=DiszpKrYNg8&programId=q04UBOqq3rp');
    cy.intercept('POST','**/tracker*').as('post');

    fillEventForm();
    addComment( comment)
    
    cy.get(Selectors.SAVE_BUTTON)
      .click();

    cy.wait('@post').then((interception) => {
      cy.log(interception.response.body.bundleReport.typeReportMap['EVENT'])
        cy.wrap(interception.response.body.bundleReport.typeReportMap['EVENT'].objectReports[0].uid).as('eventId');
        
    })
    
    cy.location('href').should('not.contain', 'new');
    cy.get(Selectors.WORKING_LIST_TABLE)
      .should('be.visible');
    
  
    cy.get('@eventId').then((eventId) => {
      openEvent(eventId)
    })
    //openLastSavedEvent();

    getCommentByValue(comment)
      .get('[data-test=comment-user]' )
      .should('have.text', Cypress.env('login_username'));
  })
})