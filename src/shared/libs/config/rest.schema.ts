import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Порт для входящих сообщений',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Соль для хеширования пароля',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP адрес сервера базы данных (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Имя пользователя для соединения с БД',
    format: String,
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'Пароль для соединения с БД',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Порт для соединения с БД (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017'
  },
  DB_NAME: {
    doc: 'Имя БД (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
});
