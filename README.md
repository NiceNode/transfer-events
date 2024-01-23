# transfer-events

Transfers events from mixpanel to a redis instance

create a .env file or set env vars:

```
MP_SA_USERNAME=<mixpanel-service-account-name>
MP_SA_SECRET=<mixpanel-service-account-secrete>
MP_PROJECT_ID=<mixpanel-project-id>
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

With node and npm installed, run
`npm install` then `node index.js`

# Redis keys

Each event will be stored as a key value, with the key `event::<event-id>` and the value `JSON.stringify(<event-data>)`
Additionally, all `event-id`'s for a particular day (UTC day) will be saved in a list under the key `eventsByDay::<yyyy-mm-dd>`
