const { exec } = require('child_process');

function executeCommand(req, res) {
    console.log('Received request:', req.body);

    const key = req.body.key;
    const value = req.body.value;

    // Check if the request body has the expected properties
    if (!key || !value) {
        console.error('Invalid request body. Missing key or value.');
        return res.status(400).send('Invalid request body. Missing key or value.');
    }

    // Construct and execute the command
    const command = `bazel-bin/service/tools/kv/api_tools/kv_service_tools service/tools/config/interface/service.config set ${key} ${value}`;
    //const command = `echo Test Command`;

    console.log(`Command to be executed: ${command}`);
    exec(command, (error, stdout, stderr) => {
        console.log('Exec callback entered');
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error executing command');
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send('Command execution resulted in error');
        }

        // Check if the response contains "client set ret = 0"
        const transactionStatus = stdout.includes('client set ret = 0') ? "true" : "false";
        console.log(`Command executed. Transaction status: ${transactionStatus}`);
        if (transactionStatus === "true") {
            // Execute the Python script here
            const pythonScriptCommand = "python3 parse1.py";
            exec(pythonScriptCommand, (pyError, pyStdout, pyStderr) => {
                if (pyError) {
                    console.error(`Python script error: ${pyError.message}`);
                 //   console.log(stderr, stdout)
                } else {
                    console.log('Python script executed successfully');
                    // Handle successful execution
                }
            });
        }
        // Send a response with the transaction status
        res.json({ transaction: transactionStatus });
    });
}

module.exports = executeCommand;
