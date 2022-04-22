const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')

// web3.eth.getGasPrice().then(console.log)

// web3.eth.getGasPrice().then((result)=> {
// 	console.log(web3.utils.fromWei(result,'ether'))
// })


console.log(web3.utils.sha3('Dapp university'))
console.log(web3.utils.keccak256('Dapp university'))
console.log(web3.utils.soliditySha3('Dapp university'))
console.log(web3.utils.randomHex(32))


