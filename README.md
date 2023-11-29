# transfer-events
Transfers events from mixpanel to a csv file and will later write the events to longterm storage

create a .env file or set env vars:
```
MP_SA_USERNAME=<mixpanel-service-account-name>
MP_SA_SECRET=<mixpanel-service-account-secrete>
MP_PROJECT_ID=<mixpanel-project-id>
```

With node and npm installed, run
`npm install` then `node index.js`