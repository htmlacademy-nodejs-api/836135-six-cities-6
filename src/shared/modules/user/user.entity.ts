import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
  public username: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true })
  public isPro: boolean;
}
