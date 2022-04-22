var EthereumTx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')

const account1 = '0xd638a539E2A504E5a3A4aF0F6D7f98d6631C5d7B'
const account2 = '0xd8F1e9e8c11e2A26D2bC070d528E01C572E953C4'

/*創建一個新帳號，private會直接出現在執行結果上*/
// console.log(web3.eth.accounts.create())
//console.log 就是把某個數值顯示在螢幕上

// 透過終端機語法 export PRIVATE_KEY_1='your private key' 先匯出自己的private key 再呼叫執行 node app.js 就可直接return private key
//console.log(process.env.PRIVATE_KEY_1)


//ethereumjs-tx buffer的使用目的是為了將每筆transaction標記(sign)，使private key變成binary data
//buffer 是 nodejs中的globally available module
//process.env.PRIVATE_KEY_1這個作法是讓private key不會直接顯示出來，不敏感資訊可以直接貼上在Buffer.form()的括號中
// process.env.PRIVATE_KEY_1='自己的金鑰'
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
// const privateKey2 = Buffer.form(process.env.PRIVATE_KEY_2, 'hex')


//可直接用meta mask 帳號來查看balance
// web3.eth.getBalance(account1,(err,bal) => {
// 	console.log('account 1 balance:', web3.utils.fromWei(bal,'ether'))
// })

// web3.eth.getBalance(account2,(err,bal) => {
// 	console.log('account 2 balance:', web3.utils.fromWei(bal,'ether'))
// })


//smart contract data



web3.eth.getTransactionCount(account1, (err, txCount) =>{
	//build the transaction
	const txObject = {
		nonce: web3.utils.toHex(txCount), 										//避免double spend problem //將txCount轉為16進位制
		to: account2, 															//給誰錢 
		value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),				//多少錢 //真實在交易是都是以wei為單位因此要再convert
		gasLimit: web3.utils.toHex(21000),										//挖礦費用上限
		gasPrice: web3.utils.toHex(web3.utils.toWei('200','gwei'))				//每單位挖礦費用
	}

	/* console.log(txObject) 													//在sign the transaction前先看看結果 */

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



