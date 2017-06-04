/* eslint-disable no-console */

import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;
console.log(constants);

try {
	mongoose.connect(constants.MONGO_URL);
} catch (error) {
	mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
	.once('open', () => console.log('База данных запущена'))
	.on('error', error => {
		throw error;
	});



