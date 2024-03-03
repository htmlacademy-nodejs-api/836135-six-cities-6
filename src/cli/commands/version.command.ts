import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';
import { errorColor } from '../../shared/libs/chalk/chalk.js';

type PackageJSONConfig = {
    version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
        private readonly filePath: string = './package.json'
  ) { }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);
    console.log(importedContent);
    if (!isPackageJSONConfig(importedContent)) {
      throw new Error(errorColor('Ошибка в парсинге файла json'));
    }

    return importedContent.version;
  }


  public getCommandName(): string {
    return '--version';
  }

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`${errorColor('Ошибка в чтении версии из')} ${this.filePath}`);

      if (error instanceof Error) {
        console.error(errorColor(error.message));
      }
    }
  }
}
