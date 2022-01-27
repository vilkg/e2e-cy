const axios = require('axios');
const _ = require('lodash')

async function initData( config ) {
  console.log('init')

  const login = await axios.get('/api', {
    baseURL: config.baseUrl,
    auth: {
      username: config.env.login_username,
      password: config.env.login_password,
    }
  });

  const client = axios.create({
    withCredentials: true,
    baseURL: config.baseUrl,
    headers: {
      'Cookie': login.headers['set-cookie'][0]
    }
  });

  const apps = await client.get('/dhis-web-apps/apps-bundle.json');
  const appList = ['dhis-web-dataentry/index.action', 'dhis-web-approval-classic/index.action'];
  appList.push(...apps.data.flatMap(i => i.webName))
  config.env.apps = appList

  console.log('Fetched the following apps for testing')
  console.table(appList)

  const dashboards = await client.get('/api/dashboards?fields=id,name');
  config.env.dashboards = dashboards.data.dashboards;

  console.log('Fetched the following dashboards for testing')
  console.table(config.env.dashboards)
  
  
 
}

module.exports = initData;
