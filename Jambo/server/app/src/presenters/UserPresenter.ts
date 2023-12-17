import Elysia from "elysia"
import { IUser } from "../entities/IUser"
import { QueueClientFactory } from "../communication/infrastructure/queue/QueueClientFactory"
import { RedisCacheClient } from "../communication/infrastructure/cache/RedisCacheClient"
import { CacheManagerFactory } from "../communication/infrastructure/cache/CacheManagerFactory"
import { UserRepository } from "../persistence/user/UserRespository"
import mongoose from 'mongoose'

const rep = new UserRepository()

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
        await rep.create( user )
        const resp = await rep.getAll()
        return resp
      } )
  )
