import * as redis from 'redis'
import { ICacheManagerClient } from './CacheManagerClient'

export class RedisCacheClient implements ICacheManagerClient
{
  private url!: string
  private client

  constructor ()
  {
    this.url = Bun.env.redisCacheUrl as string
    this.client = redis.createClient( {
      url: this.url
    } )
    this.client.on( 'connect', () =>
    {
      console.log( 'Connected to Redis server' )
    } )
    this.client.on( 'error', ( err ) =>
    {
      console.error( 'Redis error:', err )
    } )
  }
  public async connect()
  {
    await this.client.connect()
  }
  async put( key: string, value: string, ttlInSeconds: number )
  {
    try
    {
      await this.client.set( key, value )
      await this.client.expire( key, ttlInSeconds )
      console.log( 'Key set successfully with TTL:', key )
    } catch ( error )
    {
      console.error( 'Error putting key:', error )
    }
  }

  async get( key: string )
  {
    try
    {
      const result = await this.client.get( key )
      console.log( 'Value retrieved successfully:', result )
      return result
    } catch ( error )
    {
      console.error( 'Error getting key:', error )
      throw error
    }
  }
}
