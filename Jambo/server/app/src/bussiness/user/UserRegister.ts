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

  constructor ( repository: IUserRepository, temporaryRepository: IUserTemporaryRepository, encryptation: IEncryptionStrategy )
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
    return this.temporaryRepository.get( email ) ??
      this.repository.getByEmail( email )
  }

  async save( user: IUser )
  {
    await this.repository.create( user )
  }

  async update( email: string, newUserData: IUser )
  {
    await this.repository.update( email, newUserData )
  }

  async delete( email: string )
  {
    await this.repository.delete( email )
  }



}