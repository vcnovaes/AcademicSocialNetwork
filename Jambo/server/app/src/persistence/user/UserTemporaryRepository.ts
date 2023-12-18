import { Model, Document, Schema, model } from 'mongoose'
import { ICacheManagerClient } from '../../communication/infrastructure/cache/CacheManagerClient'
import { CacheManagerFactory } from '../../communication/infrastructure/cache/CacheManagerFactory'
import { IUser } from '../../entities/IUser'
import { UserModelFactory } from './UserModelFactory'
import { IUserTemporaryRepository } from './IUserTemporaryRepository'
import { IPendingUser } from '../../entities/IPendingUser'

export class UserTemporaryRepository implements IUserTemporaryRepository
{
  private cacheManager: ICacheManagerClient
  private ttl: number

  constructor ( client: ICacheManagerClient | undefined )
  {
    if ( client === undefined )
    {
      throw Error( "Client is undefined" )
    }
    this.ttl = Number( Bun.env.USER_TEMPORARY_TTL_IN_SECONDS as string )
    this.cacheManager = client
  }


  async add( user: IUser ): Promise<void>
  {

    await this.cacheManager.put( user.email, JSON.stringify( user ), this.ttl )
  }

  async get( key: string )
  {
    const obj = await this.cacheManager.get( key ) ?? ""
    const user = JSON.parse( obj ) as IPendingUser
    return user
  }
}
