import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import url from 'url';

export function verifyClient(info, next) {
	const token = url.parse(info.req.url, true).query.token;

	if(!token) {
		next(false, 401, 'Unauthorized');
	} else {
		jwt.verify(token, constants.JWT_SECRET, (error, decoded) => {
			if (error) {
				next(false, 401, 'Unauthorized');
			} else {
				info.req.user = decoded;
				next(true);
			}
		});
	}
}

export function sendMessage(webSocket, event, data = {}) {
	if (typeof event !== 'string') {
		throw Error('"event" should be a string');
	}
	webSocket.send(JSON.stringify({event, data}));
}