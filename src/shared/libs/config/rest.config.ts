import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../../types/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Невозможно прочесть .env файл. Возможно файла не существует');
    }


    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });


    this.config = configRestSchema.getProperties();
    this.logger.info('.env файл найден и успешно обработан');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
