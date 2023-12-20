import { IUser } from "../../entities/IUser"

export interface IUserRegisterControl
{
  registerTemporaryUser( user: IUser ): any
  confirmRegistration( email: string, confirmationCode: string ): any
  isUserValid( user: any ): user is IUser
  getUser( email: string ): Promise<IUser>
  isPasswordCorrect( user: IUser, incomePassword: string ): Promise<boolean>
  updateUserData( email: string, newUserData: IUser ): Promise<void>
  deleteUser( email: string ): Promise<void>
  getAll(): Promise<IUser[]>
}
