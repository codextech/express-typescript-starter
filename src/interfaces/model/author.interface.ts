import { Document } from 'mongoose';

export interface IAuthor {
    name: string;
    bio: string;
}

export interface IAuthorModel extends IAuthor, Document {
}

/* export interface AuthorDTO extends IAuthorModel {
    _id: string;
} */