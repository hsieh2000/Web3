const Web3 = require("web3");
const EthereumTx = require('ethereumjs-tx').Transaction;
const axios = require('axios');
const ethNetwork = 'https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18';
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
 
async function transferFund(sendersData, recieverData, amountToSend) {
    return new Promise(async (resolve, reject) => {
        var nonce = await web3.eth.getTransactionCount(sendersData.address);
        web3.eth.getBalance(sendersData.address, async (err, result) => {
            if (err) {
                return reject();
            }
            let balance = web3.utils.fromWei(result, "ether");
            console.log(balance + " ETH");
            if(balance < amountToSend) {
                console.log('insufficient funds');
                return reject();
            }
   
            let gasPrices = await getCurrentGasPrices();
            let details = {
                "to": recieverData.address,
                "value": web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), 'ether')),
                "gas": 21000,
                "gasPrice": gasPrices.low * 1000000000,
                "nonce": nonce,
                "chainId": 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
            };
           
            const transaction = new EthereumTx(details, {chain: 'ropsten'});
            let privateKey = sendersData.privateKey;
            let privKey = Buffer.from(privateKey,'hex');
            transaction.sign(privKey);
           
            const serializedTransaction = transaction.serialize();
           
            web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'), (err, id) => {
                if(err) {
                    console.log(err);
                    return reject();
                }
                const url = `https://ropsten.etherscan.io/tx/${id}`;
                console.log(url);
                resolve({id: id, link: url});
            });
        });
    });
}

async function getCurrentGasPrices() {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    };
    return prices;
}

async function getBalance(address) {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address, async (err, result) => {
            if(err) {
                return reject(err);
            }
            resolve(web3.utils.fromWei(result, "ether"));
        });
    });
}

transferFund({address: '0xd638a539E2A504E5a3A4aF0F6D7f98d6631C5d7B', privateKey: 'e3ce21d341437a3296ddc34e4ccf79cc19082a5ea74dc6e7d3454ab3c853c72c'},{address: '0xd8F1e9e8c11e2A26D2bC070d528E01C572E953C4'},1)



