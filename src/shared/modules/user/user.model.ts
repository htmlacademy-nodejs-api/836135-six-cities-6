import { Schema, Document, model } from 'mongoose';
import { User } from '../../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [1, 'Минимальная длина 1 символ'],
    maxlength: [15, 'Максимальная длина 15 символов'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Некорректный email'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Минимальная длина 6 символов'],
    maxlength: [12, 'Максимальная длина 12 символов'],
  },
  avatar: {
    type: String,
    match: [/[^\s]+(\.(?i)(jpg|png))$/, 'Только jpg или png'],
  },
  isPro: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
