/* eslint-disable no-console */

import WebSocket from 'ws';
import http from 'http';

import {verifyClient, sendMessage} from './helpersFunction';
import User from '../modules/User/model';

export default app => {
	const server = http.createServer(app);
	const webSocketServer = new WebSocket.Server({server, verifyClient});
	const PORT = 8080;

	webSocketServer.on('connection', async (webSocket, req) => {
		sendMessage(webSocket, 'get_user', await User.findById(req.user.id));
	});

	server.listen(PORT, () => {
		console.log(`Сокеты запущены на ${PORT} порту`);
	});
};