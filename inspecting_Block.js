const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')

// web3.eth.getBlockNumber().then(console.log)

// web3.eth.getBlock('latest').then(console.log)

// web3.eth.getBlockTransactionCount('latest').then(console.log)

// web3.eth.getBlock('latest').then((block)=> {
// 	console.log(block.hash)})

// const hash = '0x7b7979a44a5c56953d9dfc475c6fc13c03ba939a538ea4e072c3525305555e66'
// web3.eth.getTransactionFromBlock(hash, 2).then(console.log)
// 自己寫的
// web3.eth.getTransactionFromBlock(hash, 2).then((detail)=> {
// 	console.log(detail.gas)
// })

// ----------------------------------------------------------------------


// web3.eth.getBlock(12210613).then((block)=> {
// 	console.log({
// 		blockHash: block.hash,
// 		blockNumber: block.number,
// 	})
// })

// web3.eth.getBlock('0x15b606a9525420122538d122b95b37fc1730fd6ed5763614541ccedf6da1ef0a').then((block)=> {
// 	console.log({
// 		blockHash: block.hash,
// 		blockNumber: block.number,
// 	})
// })

// ----------------------------------------------------------------------

// web3.eth.getBlockNumber().then((latest) =>{
// 	for(let i = 0; i < 10; i ++) {
// 		web3.eth.getBlock(latest - i).then(console.log)
// 	}
// })

web3.eth.getBlockNumber().then((latest) =>{
	for(let i = 0; i < 10; i ++) {
		web3.eth.getBlock(latest - i).then((block) => {
			console.log(block.hash)
		})
	}
})


