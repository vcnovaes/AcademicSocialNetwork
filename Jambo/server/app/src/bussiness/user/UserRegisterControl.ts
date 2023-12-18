import { ConfirmationEmail } from "../../entities/Email"
import { IPendingUser } from "../../entities/IPendingUser"
import { IUser } from "../../entities/IUser"
import IUserRepository from "../../persistence/user/IUserRepository"
import { IUserTemporaryRepository } from "../../persistence/user/IUserTemporaryRepository"
import { ConfirmationCode } from "../../utils/CodeGenerator"
import { UserRegister } from "./UserRegister"

export class UserRegisterControl
{
  private userRegister: UserRegister

  constructor ( userRegister: UserRegister )
  {
    this.userRegister = userRegister
  }
  async registerTemporaryUser( user: IUser )
  {
    try
    {
      const code = ConfirmationCode.getCode()
      await this.userRegister.saveTemporary( { ...user, confirmationCode: code } )
      await ConfirmationEmail.send( user.email, code )
      return this.userRegister.getUser( user.email )
    } catch ( err )
    {
      console.error( "Error on temporary registeration", err )
      throw err
    }
  }
  async confirmRegistration( email: string, confirmationCode: string )
  {
    const registration = await this.userRegister.getUser( email ) as IPendingUser
    if ( !registration )
    {
      console.error( "User not found " )
      return
    }
    if ( !registration.confirmationCode )
    {
      console.info( "User already confirmed" )
      return registration as IUser
    }
    if ( ConfirmationCode.compare( registration.confirmationCode, confirmationCode ) )
    {
      delete registration.confirmationCode
      console.log( "Confirmation Succeed " )
      await this.userRegister.save( registration )
      return this.userRegister.getUser( email )
    }
  }
}