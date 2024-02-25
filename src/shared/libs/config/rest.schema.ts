import convict from 'convict';

export type RestSchema = {
  PORT: number;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих сообщений',
    format: 'port',
    env: 'PORT',
    default: 4000
  }
});
