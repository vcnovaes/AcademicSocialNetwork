// UserRepository.ts
import { IUser } from '../../entities/IUser'
import PrismaClientSingleton from '../../communication/infrastructure/database/PrismaClientSingleton'
import IUserRepository from './IUserRepository'


export class UserRepository implements IUserRepository
{
  async getAll()
  {
    return PrismaClientSingleton.getInstance().user.findMany()
  }

  async getByEmail( email: string )
  {
    return PrismaClientSingleton.getInstance().user.findUnique( {
      where: { email },
    } )
  }

  async create( user: IUser )
  {
    return PrismaClientSingleton.getInstance().user.create( {
      data: user,
    } )
  }

  async update( email: string, user: IUser )
  {
    return PrismaClientSingleton.getInstance().user.update( {
      where: { email },
      data: user,
    } )
  }

  async delete( email: string )
  {
    await PrismaClientSingleton.getInstance().user.delete( {
      where: { email },
    } )
  }
}
