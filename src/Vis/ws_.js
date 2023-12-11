const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://34.171.249.215:8080');

ws.on('open', function open() {
    console.log('Connected to the server');
});

ws.on('message', function incoming(data) {
    console.log('Data received:', data);
    saveDataToFile(data, 'src/Vis/received_data.json');
});

ws.on('close', function close() {
    console.log('Disconnected from the server');
});

ws.on('error', function error(error) {
    console.error('WebSocket error:', error);
});

function saveDataToFile(data, filePath) {
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Data saved to ${filePath}`);
        }
    });
}