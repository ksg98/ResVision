const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://35.236.46.255:8080');
const filePath = 'received_data.json';

ws.on('open', function open() {
    console.log('Connected to the server');
});

ws.on('message', function incoming(data) {
    console.log('Data received');
    processAndSaveLatestData(data);
});

ws.on('close', function close() {
    console.log('Disconnected from the server');
});

ws.on('error', function error(error) {
    console.error('WebSocket error:', error);
});

function processAndSaveLatestData(data) {
    try {
        // Parse the incoming data
        const receivedData = JSON.parse(data);

        // Flatten the nested array to access the objects
        const flattenedData = receivedData.flat();

        // Check if the flattened data contains objects
        if (flattenedData.length > 0 && typeof flattenedData[0] === 'object') {
            // Get the last object from the flattened array
            const latestData = flattenedData[flattenedData.length - 1];

            // Count the number of objects
            const objectCount = flattenedData.length;
            console.log(`Number of objects received: ${objectCount}`);

            // Write the latest data to the file
            fs.writeFile(filePath, JSON.stringify(latestData, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`Latest data saved to ${filePath}`);
                }
            });
        } else {
            console.error('Received data does not contain any objects');
        }
    } catch (err) {
        console.error('Error processing data:', err);
    }
}