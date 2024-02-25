import { Config } from './config.interface.js';
import { DotenvParseOutput, config } from 'dotenv';
import { Logger } from '../logger/index.js';

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;
  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно прочесть .env файл. Возможно файла не существует');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env файл найден и успешно обработан');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
