import mongoose from '../providers/Database';
import { IAuthorModel } from '../interfaces/model/author.interface';

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    bio: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
}, {
	timestamps: true,
	toJSON: { virtuals: true },
    toObject: { virtuals: true }
});




const Author = mongoose.model<IAuthorModel>('Author', AuthorSchema);

export default Author; 
