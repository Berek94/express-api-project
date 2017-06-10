/* eslint-disable no-console */

import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;
<<<<<<< HEAD
console.log(constants);
=======
>>>>>>> some commit

try {
	mongoose.connect(constants.MONGO_URL);
} catch (error) {
	mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
	.once('open', () => console.log('База данных запущена'))
	.on('error', error => {
		throw error;
<<<<<<< HEAD
	});



=======
	});
>>>>>>> some commit
