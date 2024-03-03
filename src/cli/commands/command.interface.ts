export interface Command {
    getCommandName(): string,
    execute(...params: string[]): void;
}
