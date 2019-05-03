# CS-Courses-Blockchain
An Ethereum Blockchain to store and add CS Courses to the blocks using a web application.

### Steps to migrate and deploy the Dapps

1. Make sure you have npm and node installed.

2. Open terminal and navigate to the project directory

3. Type "truffle migrate -f 2 --network rinkeby --reset" to migrate the contract to the rinkeby test-net

4. Now your blockchain is live in the test-net.

5. To deoloy the fron-end files navigate to the downloaded go-ipfs software in your terminal and type "ipfs init" and then "ipfs daemon"

6. Let the daemon run in that terminal. Open up another terminal and make a directory named 'dist' in the go-ipfs directory and put all the build files and the 'src' directory files in the 'dist' directory.

7. To serve the files in the ipfs system type "ipfs swarm peers" and then type "ipfs add -r dist/".

8. You will get a cryptographic hash which is used to access the files after deployment.

8. Publish the files using "ipfs name publish COPY DIST HASH HERE"

9. To access the dapp in your browser type the url "https://gateway.ipfs.io/ipfs/COPY YOUR PEERID HERE"

10. Make sure your daemon is running and "Ipfs companion" is added as an extension to your browser.

11. You now have access to your dapp and can be interacted with the blockchain.

### Steps to use the DApp:

1. Firstly, install the go-ipfs from the website using the given link and install the pre-built package called go-ipfs. (https://docs.ipfs.io/introduction/install/)

2. Extract the zip file and open your terminal and navigate to the directory of the go-ipfs and follow the installation instructions given in the above link depending on the OS version.

3. Run the following commands to have ipfs up and running:

-> ipfs init

-> ipfs daemon

4. Make sure you have the extension ?IPFS Companion? added to your chrome browser which can be found on the chrome web store.

5. Use the URL shared by us with the cryptographic hash to access the DApp.

6. Make sure you are connected to MetaMask and ?Rinkeby test network? is selected.

7. You are now set to use our DApp and test its functionality. But you only have access to the ?Get Course? functionality.

8. To get course details just type in the Rubric of the course and click on ?Get Course? button to get all the details of that course.

9. Anyone with access to the link and a MetaMask account on Rinkeby test-net can view the course details with the Course rubric if it already exists in the blockchain.

10. In order for you to have ?Add Course? functionality make sure you give your Rinkeby address to us so that we can grant you access to ?Add Course? functionality.

11. Also, you need to get some fake ethers for your address. For that go to https://www.rinkeby.io/#faucet and tweet your address on twitter. Then use the tweet?s URL to request for 3 ethers. The ethers should be added in 30 seconds.

12. You now have access to add course functionality. 

13. Now you can give course details and confirm the transaction to add the course onto the blockchain using the ?Add Course? button on the Dapps. Only privileged users have access to ?Add Course? i.e. only few addresses have been added to the contract who will have access to ?Add Course?.

#### Code Locations

1. The contract should be in ATSE V2/Contracts/Course.sol
2. The Web3.js code should be in ATSE V2/src/js/app.js
3. The HTML page should be in ATSE V2/src/index.html
