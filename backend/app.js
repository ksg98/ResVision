const express = require('express');
const cors = require('cors');
const executeCommand = require('./executeCommand');
const startWebSocketServer = require('./webSocketServer');

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/execute-command', executeCommand);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

startWebSocketServer();
