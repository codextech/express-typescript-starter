import { Document } from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    name?: string;
    resetPasswordToken? : string;
    resetPasswordExpire? : Date,
    isAdmin?: Boolean
}

export interface IUserModel extends IUser, Document {
    generateAuthToken(): string;
    getResetPasswordToken(): string;
    comparePassword(): string
}