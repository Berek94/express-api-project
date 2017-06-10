import userRouter from './User/router';

export default app => {
	app.use('/api/users', userRouter);
};