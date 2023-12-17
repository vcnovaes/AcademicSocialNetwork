import { IUser } from "../../entities/IUser"

export interface IUserTemporaryRepository
{
  add( user: IUser ): Promise<void>
  get( key: string ): Promise<IUser>
}