var EthereumTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')
const account1 = '0xd638a539E2A504E5a3A4aF0F6D7f98d6631C5d7B'
const account2 = '0xd8F1e9e8c11e2A26D2bC070d528E01C572E953C4'


const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex')

//smart contract data

const contractAddress='0x340f763894cb2e843ec4b7d9cbb3c4457170616a'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

const contract = new web3.eth.Contract(contractABI,contractAddress)

const data = contract.methods.transfer(account2,1000).encodeABI()




//查看執行合約後的帳戶餘額

// contract.methods.balanceOf(account2).call((err, balance) => { 
// 	console.log({err,balance}) 
// })


web3.eth.getTransactionCount(account1, (err, txCount) =>{

	//build the transaction
	const txObject = {
		nonce: web3.utils.toHex(txCount), 										//避免double spend problem //將txCount轉為16進位制
		to: contractAddress, 													//給誰錢 
		gasLimit: web3.utils.toHex(150000),										//挖礦費用上限
		gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),				//每單位挖礦費用
		data: data
	}




	//sign the transaction

	const tx = new EthereumTx(txObject, { chain:'ropsten'})
	tx.sign(privateKey1)


	const serializedTransaction = tx.serialize()
	const raw='0x'+serializedTransaction.toString('hex')


	//broadcast the transaction
	web3.eth.sendSignedTransaction(raw, (err, txhash) => {
    	console.log('err:',err,'txhash: ', txhash)
	})
})
