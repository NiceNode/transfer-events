import { Redis } from '@upstash/redis'

class RedisClient {
  private readonly client: Redis

  constructor() {
    // Replace these with your Upstash Redis connection details
    const redisUrl = 'YOUR_UPSTASH_REDIS_URL'
    const redisPassword = 'YOUR_UPSTASH_REDIS_PASSWORD'

    this.client = new Redis({
      url: redisUrl,
      token: redisPassword,
    })
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key)
    } catch (error) {
      console.error(`Error getting key ${key}:`, error)
      return null
    }
  }

  async set(key: string, value: string): Promise<string | null> {
    try {
      return await this.client.set(key, value)
    } catch (error) {
      console.error(`Error setting key ${key}:`, error)
      throw error
    }
  }
}

export default RedisClient
