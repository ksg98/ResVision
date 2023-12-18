## GCP deployed link : http://35.236.46.255:3001/
## Deployed Website Link : https://resvision.wl.r.appspot.com/

## FrontEnd Setup Instructions

To Run the app locally on your machine : 

1) Clone or Download the code from GitHub link https://github.com/Divyanshumalik1/ResVision
2) Install dependencies: 
	`npm update`
3) To run the web app: 
	`npm run start`
4) The project will start after building up and you can open it on this link on your computer locally: 
	`http://localhost:3000`
5) In the file to run the PBFT visualization write "" in the "KEY" section and "Value" can take multiple entries such as {vc, pbft, fbft}
     i.e. Key is empty and  Value = vc (in place of vc you can input "pbft" or "fbft")
6) Click the send button to run the BFT visualizations

## Backend Setup Instructions

Follow these steps to set up the backend for your project. Ensure you have the necessary prerequisites installed on your system before proceeding.

Setting Up the KV Server
Modify Consensus Manager:
Navigate to the resilient/platform/consensus/ordering/pbft directory.
In this directory, locate and open the consensus_manager.cpp file.
Uncomment the sender ID logs in the commit method.
Start the KV Server:
After making the above changes, you can start the KV server. Ensure that all configurations are correctly set before starting the server.
Clone the required directory into the resilientdb directory.

Python Setup
Install Regex:
Make sure you have Python3 installed on your system.
Install the regex package using pip: pip3 install regex   
		Run the Parser:
Once the regex package is installed, you can run the parser script: python3 parser.py   

WebSocket and Express Backend
Install Node.js and npm:
If not already installed, install Node.js and npm on your system. You can download them from Node.js official website.
Install Dependencies:
Navigate to the directory containing your package.json file.
Run the following command to install all necessary dependencies: npm install   
		
Start the Backend Application:
Once all dependencies are installed, start the application using: node app.js   
This will start the backend engine, and your application should now be running.
