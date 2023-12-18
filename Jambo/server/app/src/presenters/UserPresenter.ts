import Elysia from "elysia"
import { IUser } from "../entities/IUser"
import { CacheManagerFactory } from "../communication/infrastructure/cache/CacheManagerFactory"
import { UserRepository } from "../persistence/user/UserRespository"
import { UserTemporaryRepository } from "../persistence/user/UserTemporaryRepository"
import { UserRegisterControl } from "../bussiness/user/UserRegisterControl"
import { HttpStatusCode } from "../communication/http/HTTPStatusCode"
import { UserRegister } from "../bussiness/user/UserRegister"
import { BcryptEncryptionStrategy } from "../utils/encryptation/BcryptEncryptionStrategy"

const userRepository = new UserRepository()
const cacheManager = await CacheManagerFactory.getInstance()
const temporaryRepository = new UserTemporaryRepository( cacheManager )
const userRegister = new UserRegister( userRepository, temporaryRepository, new BcryptEncryptionStrategy() )
const userRegisterControl = new UserRegisterControl( userRegister )

export const UserPresenter = new Elysia()
  .group( "user", ( app ) =>
    app
      .get( "/hi", async () =>
      {
        return await userRepository.getAll()
      } )
      .post( "/register", async ( { body, set } ) =>
      {
        try
        {
          const user = body as IUser

          if ( !isUserValid( user ) )
          {
            set.status = HttpStatusCode.BAD_REQUEST
            return {
              error: "Bad Request: Invalid user data"
            }
          }

          const savedUser = await userRegisterControl.registerTemporaryUser( user )

          return savedUser

        } catch ( error )
        {
          console.error( "Error registering user:", error )
          set.status = HttpStatusCode.INTERNAL_SERVER_ERROR
          return {
            error: "Internal Server Error"
          }
        }
      } )
      .post( "/confirm", async ( { body, set } ) =>
      {
        const {
          email,
          confirmationCode
        } = body as any
        if ( !email || !confirmationCode )
        {
          set.status = 400
          return
        }
        const usr = await userRegisterControl.confirmRegistration( email, confirmationCode )
        if ( usr == undefined )
        {
          set.status = 400
          return
        }
        set.status = 200
        return usr
      } )
  )

function isUserValid( user: any ): user is IUser
{
  return (
    typeof user === 'object' &&
    user !== null &&
    typeof user.email === 'string' &&
    typeof user.password === 'string'
  )
}

