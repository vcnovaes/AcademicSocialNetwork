import { ConfirmationEmail } from "../../entities/Email"
import { IUser } from "../../entities/IUser"
import { IUserTemporaryRepository } from "../../persistence/user/IUserTemporaryRepository"

export class UserRegisterControl
{
  static async registerTemporaryUser( user: IUser, userRepository: IUserTemporaryRepository )
  {
    try
    {
      await userRepository.add( user )
      await ConfirmationEmail.send( user.email )
      return await userRepository.get( user.email )
    } catch ( err )
    {
      console.error( "Error on temporary registeration", err )
      throw err
    }
  }
}