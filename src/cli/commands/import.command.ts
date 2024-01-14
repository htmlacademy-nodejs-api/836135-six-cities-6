import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getCommandName(): string {
    return '--import';
  }

  public execute(...params: string[]): void {

  }
}
