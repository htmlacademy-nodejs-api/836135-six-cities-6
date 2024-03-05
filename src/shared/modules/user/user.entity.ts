import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { UserType } from '../../../types/entities/userType.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public username: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, default: '' })
  public password: string;

  @prop({ required: false, default: '' })
  public avatar: string;

  @prop({ required: true })
  public userType: UserType;

  constructor(userData: User) {
    super();
    this.username = userData.username;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
