export const DATA_VISUALIZER_URL = 'dhis-web-data-visualizer';

export const loadVisualisation = (id) => {
  return cy.visit(DATA_VISUALIZER_URL + '/#/' + id)
}