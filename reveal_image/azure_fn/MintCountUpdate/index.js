const Web3 = require("web3");
const fetch = require('node-fetch')
const short_abi = [
	{"inputs": [],"name": "totalSupply", "outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }

    let web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/')); // infura id
    const contract_instance = new web3.eth.Contract(short_abi, ''); // contract address
    const res = await contract_instance.methods.totalSupply().call();
    context.log('MINT_COUNT:', res);
    context.bindings.outputBlob = res.toString()
    context.log('Updated mint count in blob');
    let call_val = await fetch('https://<PLACEHOLDER>.azurewebsites.net/reveal_till_now') // reveal till now function
    let json_val = await call_val.json()
    context.log('Called REVEAL, RESULT:', json_val)
    context.log('Mint update ran at !', timeStamp);
};