/* eslint-disable no-console */

import WebSocket from 'ws';
import http from 'http';

function sendMessage(webSocket, event, data) {
	return webSocket.send(JSON.stringify({event, data}));
}

export default app => {
	const server = http.createServer(app);
	const webSocketServer = new WebSocket.Server({server});
	const PORT = 80;

	webSocketServer.on('connection', (webSocket) => {
		sendMessage(webSocket, 'message', 'Некоторый текст');
	});

	server.listen(PORT, () => {
		console.log(`Сокеты запущены на ${PORT} порту`);
	});
};