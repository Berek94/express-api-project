import userRouter from './User/router';
import postRouter from './Post/router';

export default app => {
	app.use('/api/users', userRouter);
	app.use('/api/posts', postRouter);
};