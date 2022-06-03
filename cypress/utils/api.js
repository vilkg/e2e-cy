const axios = require('axios');
const _ = require('lodash')


const fetchData = ( url, callback) => {
  axios.get(url, {
    baseURL: Cypress.baseUrl,
    auth: {
      username: Cypress.env('login_username'),
      password: Cypress.env('login_password'),
    }
  }).then((response) => {
    callback(response.data)
  })
};

export const getLineLists = () => {
  const vis = axios.get('api/eventVisualizations.json?fields=id,displayName&paging=false&filter=type:eq:LINE_LIST', {
    baseURL: Cypress.config('baseUrl'),
    auth: {
      username: Cypress.env('login_username'),
      password: Cypress.env('login_password'),
    }
  }); 

  return vis.then((response) => {
    return response.data.eventVisualizations
  })

}