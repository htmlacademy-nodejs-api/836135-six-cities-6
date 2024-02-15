import { MockServerData } from '../../types/index.js';
import { Command } from './command.interface.js';
import got from 'got';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Невозможно загрузить данные из ${url}`);
    }
  }

  public getCommandName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
    } catch (error: unknown) {
      console.error('Невозможно сгенерировать данные');

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }

}
