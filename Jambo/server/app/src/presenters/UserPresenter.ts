import Elysia from "elysia"
import { IUser } from "../entities/IUser"
import { QueueClientFactory } from "../communication/infrastructure/queue/QueueClientFactory"
import { RedisCacheClient } from "../communication/infrastructure/cache/RedisCacheClient"
import { CacheManagerFactory } from "../communication/infrastructure/cache/CacheManagerFactory"
import { UserRepository } from "../persistence/user/UserRespository"
import mongoose from 'mongoose'
import { UserTemporaryRepository } from "../persistence/user/UserTemporaryRepository"
import { ICacheManagerClient } from "../communication/infrastructure/cache/CacheManagerClient"
import { UserRegisterControl } from "../bussiness/controls/UserRegisterControl"

const rep = new UserRepository()
const cacheManager = await CacheManagerFactory.getInstance()
const temporaryRepository = new UserTemporaryRepository( cacheManager )
export const UserPresenter = new Elysia()
  .group( "user", ( app ) =>
    app
      .get( "/hi", () =>
      {
        return JSON.stringify( { "text": "hello" } )
      } )
      .post( "/register", async ( { body } ) =>
      {
        const user = body as IUser
        const r = await UserRegisterControl.registerTemporaryUser( user, temporaryRepository )
        return {
          status: 200,
          body: r
        }
      } )
  )
