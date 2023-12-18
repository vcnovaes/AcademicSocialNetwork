import { ISchemaField } from "../../utils/ISchemaField"

export class UserSchemaBuilder
{
  private userSchema: IUserSchema
  constructor ()
  {
    this.userSchema = {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true }
    }
  }

  public addConfirmationCode()
  {
    this.userSchema = {
      ...this.userSchema,
      confirmationCode: { type: String, required: true }
    }
  }
  public getUserSchema()
  {
    return this.userSchema
  }
}


interface IUserSchema
{
  firstName: ISchemaField
  lastName: ISchemaField
  email: ISchemaField
  confirmationCode?: ISchemaField
}