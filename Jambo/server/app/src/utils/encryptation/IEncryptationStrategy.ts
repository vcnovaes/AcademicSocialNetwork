export interface IEncryptionStrategy
{
  encrypt( password: string ): Promise<string>
}
