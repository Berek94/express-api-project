import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';
import Post from '../Post/model';

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
	favorites: {
		posts: [{
			type: Schema.Types.ObjectId,
			ref: 'Post',
		}],
	},
}, { timestamps: true });

userSchema.pre('save', function (next) {
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

	createToken() {
		return jwt.sign({ id: this._id }, constants.JWT_SECRET);
	},

	toAuthJSON() {
		return {
			id: this._id,
			firstName: this.firstName,
			token: `JWT ${this.createToken()}`,
		};
	},

	toJSON() {
		return {
			id: this._id,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
		};
	},

	async toggleFavorite(postId) {
		if (this.favorites.posts.indexOf(postId) >= 0) {
			this.favorites.posts.remove(postId);
			await Post.decrementFavoriteCount(postId);
		} else {
			this.favorites.posts.push(postId);
			await Post.incrementFavoriteCount(postId);
		}

		return this.save();
	},
};

export default mongoose.model('User', userSchema);