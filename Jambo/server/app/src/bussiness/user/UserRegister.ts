import { IPendingUser } from "../../entities/IPendingUser"
import { IUser } from "../../entities/IUser"
import IUserRepository from "../../persistence/user/IUserRepository"
import { IUserTemporaryRepository } from "../../persistence/user/IUserTemporaryRepository"
import { IEncryptionStrategy } from "../../utils/encryptation/IEncryptationStrategy"

export class UserRegister
{
  private repository: IUserRepository
  private temporaryRepository: IUserTemporaryRepository
  private encryptation: IEncryptionStrategy

  constructor (
    repository: IUserRepository,
    temporaryRepository: IUserTemporaryRepository,
    encryptation: IEncryptionStrategy
  )
  {
    this.repository = repository
    this.temporaryRepository = temporaryRepository
    this.encryptation = encryptation
  }

  async saveTemporary( user: IUser | IPendingUser )
  {
    user.password = await this.encryptation.encrypt( user.password )
    await this.temporaryRepository.add( user )
  }
  async getUser( email: string )
  {
    const cachedUser = await this.temporaryRepository.get( email )
    console.log( "Cached user:", cachedUser )
    if ( cachedUser != null ) return cachedUser
    const user = await this.repository.getByEmail( email )
    console.log( user )
    return user
  }

  async save( user: IUser )
  {
    await this.repository.create( user )
  }

  async getAll()
  {
    return await this.repository.getAll()
  }
  async update( email: string, newUserData: IUser )
  {
    await this.repository.update( email, newUserData )
  }

  async delete( email: string )
  {
    await this.repository.delete( email )
  }

  getEncryptationStrategy()
  {
    return this.encryptation
  }
}
