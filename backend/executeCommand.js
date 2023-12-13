const { exec } = require('child_process');

function executeCommand(req, res) {
    console.log('Received request:', req.body);

    const key = req.body.key;
    const value = req.body.value;
    const command = `/home/asharoff/resilientdb/bazel-bin/service/tools/kv/api_tools/kv_service_tools service/tools/config/interface/service.config set ${key} ${value}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing command');
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Command execution resulted in error');
        }

        if (stdout.includes('client set ret = 0')) {
            res.json({ transaction: "true", key : key, value: value });
        } else {
            res.json({ transaction: "false", output: stdout });
        }
    });
}

module.exports = executeCommand;
