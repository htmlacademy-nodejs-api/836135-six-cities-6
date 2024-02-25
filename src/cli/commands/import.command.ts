import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { errorColor, successColor } from '../../shared/libs/chalk/chalk.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  public getCommandName(): string {
    return '--import';
  }


  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(successColor(`${count} строк импортировано`));
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(errorColor(`Невозможно импортировать данные из файла ${filename}`));
      console.error(errorColor(getErrorMessage(error)));
    }
  }
}
