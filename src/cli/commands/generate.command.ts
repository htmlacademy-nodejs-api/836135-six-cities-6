import { Command } from './command.interface.js';

export class GenerateCommand implements Command {
  public getCommandName(): string {
    return '--generate';
  }

  public execute(...params: string[]): void {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);
  }

}
