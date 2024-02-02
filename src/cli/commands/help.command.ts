import { Command } from './command.interface.js';
import { successColor } from '../../shared/libs/chalk/chalk.js';

export class HelpCommand implements Command {
  public getCommandName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
    Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            ${successColor('--version')}:                   # выводит номер версии
            ${successColor('--help')}:                      # печатает этот текст
            ${successColor('--import <path>')}:             # импортирует данные из TSV
            ${successColor('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных
    `);
  }
}
