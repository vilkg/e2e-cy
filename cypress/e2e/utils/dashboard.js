export const DASHBOARD_APP_URL = 'dhis-web-dashboard'
export const DASHBOARD_SCROLL_BAR = '[data-test=inner-scroll-container]';
export const LOADED_DASHBOARD_ITEMS = '.dashboard-item-content';
export const ALL_DASHBOARD_ITEMS = '.react-grid-layout > div';

export const openDashboard = ( uid ) => {
  cy.visit(DASHBOARD_APP_URL + '/#/' + uid)
    .waitForResources();
}