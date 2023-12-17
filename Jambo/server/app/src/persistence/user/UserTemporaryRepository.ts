import { Model, Document, Schema, model } from 'mongoose'
import { ICacheManagerClient } from '../../communication/infrastructure/cache/CacheManagerClient'
import { CacheManagerFactory } from '../../communication/infrastructure/cache/CacheManagerFactory'
import { IUser } from '../../entities/IUser'
import { UserModelFactory } from './UserModelFactory'
import { IUserTemporaryRepository } from './IUserTemporaryRepository'

export class UserTemporaryRepository implements IUserTemporaryRepository
{
  private cacheManager: ICacheManagerClient
  private ttl: number = 60000

  constructor ( client: ICacheManagerClient | undefined )
  {
    if ( client === undefined )
    {
      throw Error( "Client is undefined" )
    }
    this.cacheManager = client
  }


  async add( user: IUser ): Promise<void>
  {
    await this.cacheManager.put( user.email, JSON.stringify( user ), this.ttl )
  }

  async get( key: string )
  {
    const obj = await this.cacheManager.get( key ) ?? ""
    const user = JSON.parse( obj ) as IUser
    return user
  }
}
