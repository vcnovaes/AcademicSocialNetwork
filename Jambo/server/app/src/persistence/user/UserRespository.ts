import { Model, Document, Schema, model } from 'mongoose'
import { UserModelFactory } from './UserModelFactory'
import { IUser } from '../../entities/IUser'

export class UserRepository
{
  private model
  constructor ()
  {
    this.model = UserModelFactory.getInstance()
  }
  async getAll()
  {
    return this.model.find()
  }

  async getByEmail( id: string )
  {
    return this.model.findById( id )
  }

  async create( user: IUser )
  {
    return this.model.create( user )
  }

  async update( id: string, user: IUser )
  {
    return this.model.findByIdAndUpdate( id, user, { new: true } )
  }

  async delete( id: string )
  {
    await this.model.findByIdAndDelete( id )
  }
}
