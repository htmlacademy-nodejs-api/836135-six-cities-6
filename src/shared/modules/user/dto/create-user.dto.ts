import { UserType } from '../../../../types/entities/userType.enum.js';

export class CreateUserDto {
  public username: string;
  public email: string;
  public password: string;
  public avatar: string;
  public userType: UserType;
}
