const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

console.log("Hello");

wss.on('connection', function connection(ws) {
	console.log('We have a connection!');
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
			console.log(`The data is ${data}`);
      if (client !== ws && client.readyState === WebSocket.OPEN) {
				console.log("sending....");
        client.send(data);
      }
    });
  });
});
