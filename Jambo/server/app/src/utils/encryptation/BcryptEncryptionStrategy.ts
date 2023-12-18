import { genSalt, hash, hashSync } from 'bcryptjs'
import { IEncryptionStrategy } from './IEncryptationStrategy'

export class BcryptEncryptionStrategy implements IEncryptionStrategy
{
  private readonly saltRounds: number

  constructor ( saltRounds: number = 10 )
  {
    this.saltRounds = saltRounds
  }

  async encrypt( password: string ): Promise<string>
  {
    console.log( password, this.saltRounds )
    const hashedPassword = await hash( password, this.saltRounds )
    return hashedPassword
  }
}
