export interface ICacheManagerClient
{
  put( key: string, value: string, ttlInSeconds: number ): Promise<void>
  get( key: string ): Promise<string | null>
}