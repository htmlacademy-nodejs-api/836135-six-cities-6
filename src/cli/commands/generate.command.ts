import { MockServerData } from '../../types/index.js';
import { Command } from './command.interface.js';
import got from 'got';
import { appendFile } from 'fs/promises';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { errorColor, successColor } from '../../shared/libs/chalk/chalk.js';


export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offerCount; i++) {
      await appendFile(
        filepath,
        `${tsvOfferGenerator.generate()}\n`,
        { encoding: 'utf-8'}
      );
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(errorColor(`Невозможно загрузить данные из ${url}`));
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
      await this.write(filepath, offerCount);
      console.info(successColor(`Файл ${filepath} был создан!`));
    } catch (error: unknown) {
      console.error(errorColor('Невозможно сгенерировать данные'));

      if(error instanceof Error) {
        console.error(error.message);
      }
    }
  }

}
