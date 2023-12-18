import { IPendingUser } from "../../entities/IPendingUser"
import { IUser } from "../../entities/IUser"

export interface IUserTemporaryRepository
{
  add( user: IUser | IPendingUser ): Promise<void>
  get( key: string ): Promise<IUser | IPendingUser>
}