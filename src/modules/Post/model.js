import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Title is required!'],
		minlength: [3, 'Title need to be longer!'],
	},
	text: {
		type: String,
		trim: true,
		required: [true, 'Text is required'],
		minlength: [10, 'Text need to be longer!'],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	favoriteCount: {
		type: Number,
		default: 0,
	},
}, { timestamps: true });

postSchema.methods = {
	toJSON() {
		return {
			id: this._id,
			title: this.title,
			text: this.text,
			created: this.createdAt,
			user: this.user,
			favoriteCount: this.favoriteCount,
		};
	},
};

postSchema.statics = {
	createPost(args, user) {
		return this.create({
			...args,
			user,
		});
	},

	list(skip = 0, limit = 5) {
		return this.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.populate('user');
	},

	incrementFavoriteCount(postId) {
		return this.findByIdAndUpdate(postId, {$inc: {favoriteCount: 1}});
	},

	decrementFavoriteCount(postId) {
		return this.findByIdAndUpdate(postId, {$inc: {favoriteCount: -1}});
	},
};

export default mongoose.model('Post', postSchema);