/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import ndjson from 'ndjson'

const username = process.env.MP_SA_USERNAME
const secret = process.env.MP_SA_SECRET
const project_id = process.env.MP_PROJECT_ID

// Replace these with your Upstash Redis connection details
if (username == null || secret == null || project_id == null) {
  throw new Error('env vars MP_... not set')
}

// API docs: https://developer.mixpanel.com/reference/raw-event-export
const baseUrl = 'https://data-eu.mixpanel.com/api/2.0/export'

// yyyy-mm-dd (no later than today)
// const from_date = '2023-01-01';
const from_date = '2023-11-26'
const to_date = '2023-11-27'
let queryParams = `?project_id=${project_id}&from_date=${from_date}&to_date=${to_date}`
const fullUrl = baseUrl + queryParams

// const events = ["DailyUserReport"];
const events = ['OpenApp']

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (events) {
  // Convert the array to a JSON string
  const jsonString = JSON.stringify(events)

  // URL encode the JSON string
  const encodedJson = encodeURIComponent(jsonString)
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`Only fetching ${events} events`)
  queryParams = `${queryParams}&event=${encodedJson}`
}

console.log(`queryParams: ${queryParams}`)

const options = {
  method: 'GET',
  headers: {
    accept: 'text/plain',
    authorization:
      'Basic ' + Buffer.from(username + ':' + secret).toString('base64'),
  },
}

const userOpenApps = {}
const printResults = (): void => {
  console.log(
    `num of distinct user that opened app at least once.... userOpenApps: ${Object.keys(userOpenApps).length}`,
  )
  console.log('userOpenApps: ', userOpenApps)

  // console.log(`node counts.... ethereum: ${ethereumNodeCount}, farcaster: ${farcasterNodeCount}, other: ${otherNodeCount},`)
  // console.log(`allNodes: `, allNodes)
}
const mpObjects = []

export const processData = async (): Promise<void> => {
  try {
    const res = await fetch(fullUrl, options)
    console.log('res: ', res)
    const body = await res.text()

    console.log(body)
    // const resJson = JSON.parse(body);
    // console.log(resJson)

    // Create a stream from the string
    const stream = ndjson.parse()

    let objCount = 0
    // Handling each parsed object
    stream.on('data', (obj) => {
      console.log('on data', obj)
      // Mp's event param doesn't seem to work, so
      // we filter only for the objects we want here
      if (events.includes(obj.event)) {
        mpObjects.push(obj)
        objCount++
      }
    })

    // Handling any errors
    stream.on('error', (error) => {
      console.error('Error parsing JSONL:', error)
    })

    // Handling the end of the stream
    stream.on('end', () => {
      console.log('Finished parsing all JSONL objects.')
      console.log('obj count: ', objCount)

      //   writeDateToCSV()
      printResults()
    })

    // Write the JSONL string to the stream
    stream.end(body)
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    console.error('error:' + err)
  }
}
