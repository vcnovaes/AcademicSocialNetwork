import { IUser } from "../entities/IUser"
import { IUserRegisterControl } from "./user/IUserRegisterControl"

export class JamboFacade
{
  private userRegisterControl: IUserRegisterControl
  constructor ( userRegisterControl: IUserRegisterControl )
  {
    this.userRegisterControl = userRegisterControl
  }
  public async registerTemporary( user: IUser )
  {
    return await this.userRegisterControl.registerTemporaryUser( user )
  }
  public validateUserData( user: IUser )
  {
    return this.userRegisterControl.isUserValid( user )
  }
  public async confirmRegistration( email: string, confirmationCode: string )
  {
    return this.userRegisterControl.confirmRegistration(
      email,
      confirmationCode
    )
  }
  public async verifyUserIdentity( email: string, password: string )
  {
    const user = await this.userRegisterControl.getUser( email )
    console.log( "retrived", user )
    if ( !user ) return
    const isAuth = await this.userRegisterControl.isPasswordCorrect(
      user,
      password
    )
    return isAuth ? user : null
  }
  public async updateUserData( email: string, newUserData: IUser )
  {
    return await this.userRegisterControl.updateUserData( email, newUserData )
  }
  public async deleteUser( email: string )
  {
    return this.userRegisterControl.deleteUser( email )
  }
  public async getAll()
  {
    return this.userRegisterControl.getAll()
  }

  public async getUser( email: string )
  {
    const user = await this.userRegisterControl.getUser( email )
    user.password = "*".repeat( user.password.length )
    return user
  }
}
