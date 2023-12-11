const fs = require('fs');
const WebSocket = require('ws')
const fileName = 'parser/output.json';
const fileCheckInterval = 1000;

function sendFileDataToClient(client) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const message = JSON.stringify(jsonData);
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
                console.log(`Data sent to client: ${message}`);
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
}

function startFileWatcher(wss) {
    fs.watch(fileName, (eventType, filename) => {
        if (eventType === 'change') {
            console.log(`File ${filename} has been changed`);
            wss.clients.forEach(client => {
                sendFileDataToClient(client);
            });
        }
    });
}

function checkFileExists(wss) {
    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`${fileName} not found. Checking again in ${fileCheckInterval / 1000} seconds.`);
            setTimeout(() => checkFileExists(wss), fileCheckInterval);
        } else {
            console.log(`${fileName} found. Starting file watcher.`);
            startFileWatcher(wss);
        }
    });
}

module.exports = {
    sendFileDataToClient,
    checkFileExists
};
