# transfer-events

Transfers events from mixpanel to a redis instance. This is intended to be able to be re-run without any issues.

create a .env file or set env vars:

```
TZ=UTC
PROD_UPSTASH_REDIS_REST_URL="<prod-url>"
PROD_UPSTASH_REDIS_REST_TOKEN="<prod-token>"
MP_SA_USERNAME=<mixpanel-service-account-name>
MP_SA_SECRET=<mixpanel-service-account-secrete>
MP_PROJECT_ID=<mixpanel-project-id>

# Dev env testing
# See `synthesize-events` readme for more details
DEV_UPSTASH_REDIS_REST_URL="http://localhost:8080"
DEV_UPSTASH_REDIS_REST_TOKEN="dummy_token"
```

Modify `from_date` and `to_date` in `src/mixpanel.ts` to change days to run this for
With node and npm installed, run
`npm install` then `npm run watchIndex` (careful this will re-run on any file save)

# Redis keys

Each event will be stored as a key value, with the key `event::<event-id>` and the value `JSON.stringify(<event-data>)`
Additionally, all `event-id`'s for a particular day (UTC day) will be saved in a list under the key `eventsByDay::<yyyy-mm-dd>`

# Troubleshooting

Be careful with timezones. Mixpanel likely uses local timezones, but we want to use UTC timezones for all dates.

# Run with cron job
Use `crontab -e` to edit the user's cron jobs.

To run it once a day at a specific time try something like:
```
50 14 * * * cd /home/johns/dev/transfer-events && /usr/bin/npm run runProd >> /home/johns/cronoutput.txt 2>&1
```
`which npm` to determine npm path (path isn't always setup with crontab)