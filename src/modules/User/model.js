import mongoose, {Schema} from 'mongoose';
import validator from 'validator';
import {hashSync, compareSync} from 'bcrypt-nodejs';

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required'],
		trim: true,
		validate(email) {
			return validator.isEmail(email);
		},
		message: '{VALUE} is not a valid email!',
	},
	firstName: {
		type: String,
		required: [true, 'FirstName is required'],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'LastName is required'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		trim: true,
		minlength: [6, 'Password need to be longer'],
	},
});

userSchema.pre('save', function(next) {
	if (this.isModified('password')) {
		this.password = this.hashPassword(this.password);
	}

	return next();
});

userSchema.methods = {
	hashPassword(password) {
		return hashSync(password);
	},
	authenticateUser(password) {
		return compareSync(password, this.password);
	},
};

export default mongoose.model('User', userSchema);