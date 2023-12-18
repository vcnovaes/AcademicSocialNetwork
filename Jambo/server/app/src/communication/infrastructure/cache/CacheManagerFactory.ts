import { RedisCacheClient } from "./RedisCacheClient"

export class CacheManagerFactory
{
  public static async getInstance()
  {
    if ( Bun.env.cacheServer == "redis" )
    {
      const client = new RedisCacheClient()
      client.connect()
      return client
    }
  }

}