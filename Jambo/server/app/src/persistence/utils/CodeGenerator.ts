interface CodeGenerationStrategy
{
  generateCode(): string
}

class RandomCodeStrategy implements CodeGenerationStrategy
{
  private readonly codeLength: number = 6;
  constructor ( length: number )
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

class SequentialCodeStrategy implements CodeGenerationStrategy
{
  private currentCode: number = 1000;

  generateCode(): string
  {
    return ( this.currentCode++ ).toString()
  }
}

class CodeGenerator
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
