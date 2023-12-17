export abstract class CacheManagerClient
{
  async put( key: string, value: string, ttlInSeconds: number ) { throw new Error( "Not implemented" ) }
  async get( key: string ): Promise<string | null> { throw new Error( "Not implemented" ) }
}