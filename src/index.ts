import RedisClient from './RedisClient'

console.log('Hello from TypeScript and Node.js!')

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const test = async () => {
  const redisClient = new RedisClient()
  const output = await redisClient.get('numActiveNodes')
  console.log('numActiveNodes: ', output)
}
void test()
