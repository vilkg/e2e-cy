import { loadEventChart } from '../utils/analytics';

describe('Event visualizer', () => {
  const eventCharts = Cypress.env('eventCharts'); 
  console.table(eventCharts);
  
  beforeEach(() => {
    cy.clearConsoleLogs();
  })
  eventCharts.forEach( chart  => {
    it(chart.displayName, () => {
      loadEventChart(chart.id); 

      cy.getConsoleLogs().should((logs) => {
        const reportLog = 'Event report: ' + chart.displayName + ' has ' + logs.length + ' severe errors: \n' + JSON.stringify(logs, null, 1);

        expect(logs, reportLog).to.have.length(0)
      })
    })
  });
})