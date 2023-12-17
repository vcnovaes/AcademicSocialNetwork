interface CodeGenerationStrategy
{
  generateCode(): string
}

export class RandomCodeStrategy implements CodeGenerationStrategy
{
  private readonly codeLength: number
  constructor ( length: number = 6 )
  {
    this.codeLength = length
  }

  generateCode(): string
  {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let code = ''
    for ( let i = 0; i < this.codeLength; i++ )
    {
      const randomIndex = Math.floor( Math.random() * characters.length )
      code += characters.charAt( randomIndex )
    }
    return code
  }
}

export class SequentialCodeStrategy implements CodeGenerationStrategy
{
  private currentCode: number = 1000;

  generateCode(): string
  {
    return ( this.currentCode++ ).toString()
  }
}

export class CodeGenerator
{
  private strategy: CodeGenerationStrategy

  constructor ( strategy: CodeGenerationStrategy )
  {
    this.strategy = strategy
  }

  setStrategy( strategy: CodeGenerationStrategy ): void
  {
    this.strategy = strategy
  }

  generateCode(): string
  {
    return this.strategy.generateCode()
  }
}
