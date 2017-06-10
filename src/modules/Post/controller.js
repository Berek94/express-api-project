import Post from './model';
import User from '../User/model';

export async function createPost({body, user: {id}}, res) {
	try {
		const post = await Post.createPost(body, id);
		return res.status(201).json(post);
	} catch (error) {
		return res.status(400).json(error);
	}
}

export async function getPostById({params}, res) {
	try {
		const post = await Post.findById(params.id).populate('user');
		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json(error);
	}
}

export async function getPostsList({query}, res) {
	const limit = Number(query.limit);
	const skip = Number(query.skip);
	try {
		const posts = await Post.list(skip, limit);
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(400).json(error);
	}
}

export async function updatePost({params, user, body}, res) {
	try {
		const post = await Post.findById(params.id);

		if (!post.user.equals(user.id)) {
			return res.sendStatus(401);
		}

		Object.keys(body).forEach(key => {
			post[key] = body[key];
		});

		await post.save();
		return res.sendStatus(200).json();
	} catch (error) {
		return res.status(400).json(error);
	}
}

export async function deletePost({params, user}, res) {
	try {
		const post = await Post.findById(params.id);

		if (!post.user.equals(user.id)) {
			return res.sendStatus(401);
		}

		await post.remove();
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json(error);
	}
}

export async function favoritePost(req, res) {
	try {
		const user = await User.findById(req.user.id);
		await user.toggleFavorite(req.params.id);
		return res.sendStatus(200);
	} catch (error) {
		return res.status(400).json(error);
	}
}