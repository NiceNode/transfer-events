import { format } from 'date-fns'
import RedisClient from './RedisClient'
import { type MixpanelEvent, processData } from './mixpanel'

console.log('Hello from TypeScript and Node.js!')

const redisClient = new RedisClient()
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// const test = async () => {
//   const output = await redisClient.get('numActiveNodes')
//   console.log('numActiveNodes: ', output)
// }
// void test()

const eventPrefix = 'event::'
const eventsByDayPrefixWithoutDate = 'eventsByDay'
const makeAEventsByDayPrefix = (yyyyMMddString: string): string =>
  `${eventsByDayPrefixWithoutDate}-${yyyyMMddString}::`

const transferAnEvent = async (event: MixpanelEvent): Promise<void> => {
  // save event to redis
  const redisEventId = `${eventPrefix}${event.properties.distinct_id}`
  await redisClient.set(redisEventId, JSON.stringify(event))

  // add event to day set
  console.log('transferAnEvent: ', event)
  const yyyyMMddString = format(event.properties.time * 1000, 'yyyy-MM-dd')
  console.log('yyyy-MM-dd: ', yyyyMMddString)
  const eventsByDayPrefix = makeAEventsByDayPrefix(yyyyMMddString)
  await redisClient.addToSet(eventsByDayPrefix, redisEventId)
}

void processData(transferAnEvent)
