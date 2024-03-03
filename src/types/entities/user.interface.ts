import { UserType } from './userType.enum.js';

export interface User {
	username: string,
	email: string,
	password: string,
	avatar: string,
	userType: UserType,
}
