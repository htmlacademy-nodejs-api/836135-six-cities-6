import { Command } from './commands/command.interface.js';

type CommandCollection = Record<string, Command>

export class CLIApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getCommandName())) {
        throw new Error(`Команда ${command.getCommandName()} уже зарегистрирована`);
      }
      this.commands[command.getCommandName()] = command;
    });
  }
}

