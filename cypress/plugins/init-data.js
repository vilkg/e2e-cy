const axios = require('axios');
const _ = require('lodash')

const struts_apps = ['dhis-web-dataentry/index.action', 'dhis-web-approval-classic/index.action']

async function initData( config ) {
  console.log('Initializing data')

  const login = await axios.get('/api', {
    baseURL: config.baseUrl,
    auth: {
      username: config.env.login_username,
      password: config.env.login_password,
    }
  });

  const client = axios.create({
    withCredentials: false,
    baseURL: config.baseUrl,
    headers: {
      'Cookie': login.headers['set-cookie'][0]
    }
  });

  const fetchData = async ( url, callback) => {
    const { data } = await client.get(url, {
      baseURL: config.baseUrl,
      auth: {
        username: config.env.login_username,
        password: config.env.login_password,
      }
    });

    return callback( data ); 
  };
  
  await fetchData('/dhis-web-apps/apps-bundle.json', ( data ) => {
    const appList = struts_apps;
  
    appList.push(...data.flatMap(i => i.webName))
    config.env.apps = appList
  
    console.log('Fetched the following apps for testing')
    console.table(appList)
  })

  await fetchData('/api/dashboards?fields=id,name&paging=false', (data) => {
    config.env.dashboards = data.dashboards;
    
  })
  await fetchData('/api/visualizations?fields=id,displayName&paging=false', (data) => {
    config.env.visualizations = data.visualizations;
  })
}

module.exports = initData;
