import requests, os, time
from datetime import datetime
ENABLED = os.environ['CYPRESS_REPORT_PORTAL_ENABLED']
URL = "https://test.tools.dhis2.org/reportportal/api/v1/dhis2_auto"
REPORT_PORTAL_TOKEN = os.environ['RP_TOKEN']
CI_BUILD_ID = os.environ['CI_BUILD_ID']

if ENABLED == False:
  exit(0)

headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {}'.format(REPORT_PORTAL_TOKEN)
}
launches = requests.get(url="{}/launch".format(URL), headers=headers, params={'filter.has.attributeValue': CI_BUILD_ID} )

def close(items):
  body = {
    "entities": {}
  }
  for item in items:
      body['entities'][str(item)] = {
        "status": "STOPPED",
        "endTime": str(datetime.now())
      }

  r = requests.put(url="{}/launch/stop".format(URL), headers=headers, json=body)
  if r.ok == False: 
    print('Failed to close items!')
    print(r.json())

def merge(launches, startime): 
    body = {
      "mergeType": "BASIC",
      'launches': launches,
      "endTime": str(datetime.now().isoformat()),
      'extendSuitesDescription': 'true',
      'name': 'e2e_tests',
      'startTime': startime
    }
 
    r = requests.post(url="{}/launch/merge".format(URL), headers=headers, json=body)

    if r.ok == False:
      print('Failed to merge items')
      print(r.json())
   
    print(r.json())

content = launches.json()['content']
if len(content) < 2: 
  print('There were {} launches found. No need for merging.'.format(len(content)))
  exit(0)

in_progress = [x for x in content if x['status'] == 'IN_PROGRESS']
print(in_progress)

if len(in_progress) > 0:
  print('Closing in progress items')
  close( [x['id'] for x in in_progress])

startime = min([launch['startTime'] for launch in content])
merge([x['id'] for x in content], startime)