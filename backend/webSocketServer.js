const WebSocket = require('ws');
const fileWatcher = require('./fileWatcher');

function startWebSocketServer() {
    const wss = new WebSocket.Server({ port: 8080 });
    console.log('WebSocket server started on port 8080');

    wss.on('connection', ws => {
        console.log('New client connected');
        fileWatcher.sendFileDataToClient(ws);
    });

    fileWatcher.checkFileExists(wss);
}

module.exports = startWebSocketServer;
