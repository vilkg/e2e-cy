import {
  openDashboard,
  DASHBOARD_SCROLL_BAR,
  LOADED_DASHBOARD_CHIPS,
  ALL_DASHBOARD_ITEMS,
  LOADED_DASHBOARD_ITEMS
} from './utils/dashboard'

describe('Dashboards', () => {
  const dashboards = Cypress.env('dashboards')
 
  beforeEach(() => {
    cy.clearConsoleLogs();
  })
  
  dashboards.forEach(dashboard => {
    it(dashboard.name, () => {
      openDashboard( dashboard.id );
      scrollDown()

      cy.waitForResources()
        .getConsoleLogs().should( (logs) => {
          const reportLog = 'Dashboard: ' + dashboard.name + ' has ' + logs.length + ' severe errors: \n' + JSON.stringify(logs, null, 1);
          expect(logs, reportLog).to.have.length(0);
        })
    })
  });

})

function scrollDown( i = 1 ) {
  const resolution = Cypress.config("viewportHeight")
  if ( i  > 15 ){
    throw 'Exceeded recursion level'  
  }

  cy.get(LOADED_DASHBOARD_ITEMS).then(visibleItems => {
    cy.get(ALL_DASHBOARD_ITEMS).then((allItems)=> {
      if (Cypress.$(allItems).length != Cypress.$(visibleItems).length) {
        cy.get(DASHBOARD_SCROLL_BAR)
          .scrollTo(0, resolution * i)
          .waitForResources()
        scrollDown(i+1)
      }
  
      return cy.wrap(allItems)
    })
  })
}