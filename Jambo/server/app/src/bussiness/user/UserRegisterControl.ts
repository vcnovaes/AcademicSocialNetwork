import { ConfirmationEmail } from "../../entities/Email"
import { IPendingUser } from "../../entities/IPendingUser"
import { IUser } from "../../entities/IUser"
import IUserRepository from "../../persistence/user/IUserRepository"
import { IUserTemporaryRepository } from "../../persistence/user/IUserTemporaryRepository"
import { ConfirmationCode } from "../../utils/CodeGenerator"
import { IEncryptionStrategy } from "../../utils/encryptation/IEncryptationStrategy"
import { IUserRegisterControl } from "./IUserRegisterControl"
import { UserRegister } from "./UserRegister"

class UserRegisterControl implements IUserRegisterControl
{
  private userRegister: UserRegister

  constructor ( userRegister: UserRegister )
  {
    this.userRegister = userRegister
  }
  async deleteUser( email: string ): Promise<void>
  {
    await this.userRegister.delete( email )
  }
  async registerTemporaryUser( user: IUser )
  {
    try
    {
      const code = ConfirmationCode.getCode()
      await this.userRegister.saveTemporary( {
        ...user,
        confirmationCode: code,
      } )
      await ConfirmationEmail.send( user.email, code )
      return this.userRegister.getUser( user.email )
    } catch ( err )
    {
      console.error( "Error on temporary registeration", err )
      throw err
    }
  }
  async updateUserData( email: string, newUserData: IUser ): Promise<void>
  {
    try
    {
      return await this.userRegister.update( email, newUserData )
    } catch ( err )
    {
      console.error( "Error updating user:", email )
      console.error( err )
      throw err
    }
  }
  async confirmRegistration( email: string, confirmationCode: string )
  {
    const registration = ( await this.userRegister.getUser(
      email
    ) ) as IPendingUser
    if ( !registration )
    {
      console.error( "User not found " )
      return
    }
    console.info( registration )

    if (
      ConfirmationCode.compare(
        registration.confirmationCode ?? "",
        confirmationCode
      )
    )
    {
      delete registration.confirmationCode
      console.log( "Confirmation Succeed " )
      await this.userRegister.save( registration )
      return this.userRegister.getUser( email )
    }
  }
  public isUserValid( user: any ): user is IUser
  {
    return (
      typeof user === "object" &&
      user !== null &&
      typeof user.email === "string" &&
      typeof user.password === "string"
    )
  }
  public async getUser( email: string ): Promise<IUser>
  {
    const user = ( await this.userRegister.getUser( email ) ) as IUser
    return user
  }

  public async isPasswordCorrect( user: IUser, incomePassword: string )
  {
    const encryptator = this.userRegister.getEncryptationStrategy()

    return await encryptator.comparePassword( incomePassword, user.password )
  }
  public async getAll(): Promise<IUser[]>
  {
    return await this.userRegister.getAll()
  }
}

export class UserRegisterControlFactory
{
  public static getInstance(
    repository: IUserRepository,
    temporaryRepository: IUserTemporaryRepository,
    encryptation: IEncryptionStrategy
  )
  {
    return new UserRegisterControl(
      new UserRegister( repository, temporaryRepository, encryptation )
    )
  }
}
