import { IUser } from '../../entities/IUser'

interface IUserRepository
{
  getAll(): Promise<Array<IUser>>
  getByEmail( email: string ): Promise<IUser | null>
  create( user: IUser ): Promise<IUser>
  update( email: string, user: IUser ): Promise<IUser | null>
  delete( email: string ): Promise<void>
}

export default IUserRepository
