import RedisClient from './RedisClient'
import { type MixpanelEvent, processData } from './mixpanel'

console.log('Hello from TypeScript and Node.js!')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const test = async () => {
  const redisClient = new RedisClient()
  const output = await redisClient.get('numActiveNodes')
  console.log('numActiveNodes: ', output)
}
void test()

const transferAnEvent = (event: MixpanelEvent): void => {
  // input is mixpanel event
  console.log('transferAnEvent: ', event)
  // parses it
  // saves to redis
  // adds to day list
  // returns success or not
}

void processData(transferAnEvent)
