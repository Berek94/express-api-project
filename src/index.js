/* eslint-disable no-console */

import express from 'express';
import constants from './config/constants';
import './config/database';
import middlewaresConfig from './config/middlewares';
import apiRouter from './modules';
import sockets from './sockets';

const app = express();

middlewaresConfig(app);

app.get('/', (req, res) => {
	res.send('Hello World');
});

apiRouter(app);
sockets(app);

app.listen(constants.PORT, (error) => {
	if (error) {
		throw error;
	} else {
		console.log(`Сервер запущен в режиме "${process.env.NODE_ENV}" на ${constants.PORT} порту`);
	}
});
