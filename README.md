
# e2e-cy

## Environment variables

| Environment variable | Description | Required | Default value | 
|---|---|---|---|
| CYPRESS_BASE_URL | URL of instance under test | true | smoke.dhis2.org/dev_smoke | 
| CYPRESS_LOGIN_USERNAME  | username of user used in tests   |  true | admin |
| CYPRESS_LOGIN_PASSWORD | password of user used in tests | true | district | 
| CYPRESS_REPORT_PORTAL_ENABLED | boolean parameter used to control integration with report portal | false | false | 

## Running the tests

### With docker 
To avoid installing cypress and required browsers locally, it's possible to run the tests within a docker container. 

```
docker build -t dhis2/cypress-tests:master .
docker-compose up
```

### Without docker 

To run the tests sequentially, use `npm run cy:test`
To run the tests in parallel, use `npm run cy:parallel`. All specs will be split into 3 batches and run in parallel. 

## Reporting
### Allure
[Allure](https://docs.qameta.io/allure/)  is the framework used to generate a test report. To generate and serve the report, run `npm run allure:serve`. The report should open in a browser window. 

### Report portal

To enable syncing with report portal, the following environment variables are required:

|  |  |
|--|--|
| CYPRESS_REPORT_PORTAL_ENABLED | Whether of not report portal integration should be enabled |
| RP_TOKEN | Token of report portal user. Can be found in [user profile of report portal](https://test.tools.dhis2.org/reportportal/ui/#user-profile) |
| CI_BUILD_ID | An attribute to add to every launch started by report portal used to merge the launches after test run. | 
