import { IUser } from "./IUser"

export interface IPendingUser extends IUser
{
  confirmationCode?: string
}