import { getLineLists } from '../utils/api';
import { LINE_LISTING_APP, loadLineList, Selectors } from '../utils/analytics';

describe('Line listing', () => {
  const lineLists = Cypress.env('eventVisualizations');

  beforeEach(() => {
    cy.visit(LINE_LISTING_APP)
  })
  
  lineLists.forEach(lineList => {
    it(lineList.displayName, () => {
      loadLineList(lineList.id);

      cy.getConsoleLogs().should((logs) => {
        const reportLog = 'Line list: ' + lineList.displayName + ' has ' + logs.length + ' severe errors: \n' + JSON.stringify(logs, null, 1);
  
        expect(logs, reportLog).to.have.length(0)
      })
    })
  });

})