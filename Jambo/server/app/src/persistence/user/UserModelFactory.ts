import { Model, Document, Schema, model } from 'mongoose'
import { UserSchemaBuilder } from './UserSchemaBuilder'

export class UserModelFactory
{
  public static getInstance()
  {
    const userSchemaBuilder = new UserSchemaBuilder()
    const schema = new Schema( userSchemaBuilder.getUserSchema() )
    return model( 'User', schema )

  }

}