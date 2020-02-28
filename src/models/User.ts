import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import mongoose from '../providers/Database';
import  Locals  from "../providers/Locals";
import { INext } from "../interfaces";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
	required: [true, 'name is required'],
	minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
	required: [true, 'email is required'],
	minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
	required: [true, 'password is required'],
    minlength: 5,
    maxlength: 1024
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isAdmin: Boolean
}, {
	timestamps: true,
	toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


UserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, Locals.config().appSecret);
  return token;
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');
  
	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
	  .createHash('sha256')
	  .update(resetToken)
	  .digest('hex');
  
	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
	return resetToken;
  };

// Password hash middleware
UserSchema.pre<any>('save', function (_next : INext) {
	const user = this;
	if (!user.isModified('password')) {
		return _next();
	}

	bcrypt.genSalt(10, (_err, _salt) => {
		if (_err) {
			return _next(_err);
		}

		bcrypt.hash(user.password , _salt, (_err : any, _hash: any) => {
			if (_err) {
				return _next(_err);
			}

			user.password = _hash;
			return _next();
		});
	});
});


// Compares the user's password with the request password
UserSchema.methods.comparePassword = function (_requestPassword: any, _cb: any): any {
	bcrypt.compare(_requestPassword, this.password, (_err, _isMatch) => {
		return _cb(_err, _isMatch);
	});
};

const User = mongoose.model('User', UserSchema);

/* ======= Can Use Joi as well for validation  =============*/
/* 
function validateUser(user: any) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.valid(user, schema);
}
 */

exports.User = User; 
// exports.validate = validateUser;
