import { loadVisualisation } from './utils/visualizations';
describe('Data visualizer', () => {

  const visualizations = Cypress.env('visualizations');
 
  visualizations.forEach(visualization => {
    it(visualization.displayName, () => {
        loadVisualisation( visualization.id )
        
        cy.waitForResources()
          .getConsoleLogs().should((logs) => {
            const reportLog = 'Visualization: ' + visualization.name + ' has ' + logs.length + ' severe errors: \n' + JSON.stringify(logs, null, 1);

            expect(logs, reportLog).to.have.length(0)
          })
    })
  });
})