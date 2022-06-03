const axios = require('axios');
const _ = require('lodash')

const struts_apps = ['dhis-web-dataentry/index.action']
const queryParams = '?fields=displayName,id&paging=false';

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
  })

  await fetchData('/api/dashboards' + queryParams, (data) => {
    config.env.dashboards = data.dashboards;
    console.table(config.env.dashboards)
    
  })
  await fetchData('/api/visualizations' + queryParams, (data) => {
    config.env.visualizations = data.visualizations;
  })

  await fetchData('/api/eventReports.json' + queryParams, (data) =>{
    config.env.eventReports = data.eventReports;
  })

  await fetchData('/api/eventCharts.json' + queryParams, (data) => {
    config.env.eventCharts = data.eventCharts;
  })

  await fetchData('/api/maps.json' + queryParams, ( data ) => {
    config.env.maps = data.maps;
  })

  await fetchData(`/api/eventVisualizations.json${queryParams}&filter=type:eq:LINE_LIST`, ( data ) => {
    config.env.eventVisualizations = data.eventVisualizations;
    console.table(config.env.eventVisualizations)

  })
}

module.exports = initData;
