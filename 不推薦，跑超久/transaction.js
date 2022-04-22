
const key1 = 'e3ce21d341437a3296ddc34e4ccf79cc19082a5ea74dc6e7d3454ab3c853c72c'
const key2 = 'e21aa05150ccf6bd04f47ba78319056bc950e726b3232090cfb2fbe771aeee62'











const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')

const account1 = '0xd638a539E2A504E5a3A4aF0F6D7f98d6631C5d7B'
const account2 = '0xd8F1e9e8c11e2A26D2bC070d528E01C572E953C4'

const privateKey =key2




web3.eth.getTransactionCount(account2, (err, txCount)  => {
  //build the transaction
  const txObject = {
    to: account1,                                 //給誰錢 
    value:web3.utils.toWei('1', 'ether'),         //多少錢 //真實在交易是都是以wei為單位因此要再convert
    gas: '1000000',                                 //挖礦費用上限
    gasPrice: web3.utils.toWei('100','gwei'),       //每單位挖礦費用
  }

  //console.log(txObject)                       //在sign the transaction前先看看結果 

  //sign the transaction

  const signedTransaction = web3.eth.accounts.signTransaction(txObject, privateKey); 

  //broadcast the transaction
  signedTransaction.then(signedTx => {

    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

    sentTx.on("receipt", receipt => {
        console.log("receipt: ", receipt);
      });

    sentTx.on("error", err => {
        console.log(err.message)
    });

  }), 'pending'

})







//e3ce21d341437a3296ddc34e4ccf79cc19082a5ea74dc6e7d3454ab3c853c72c
//e21aa05150ccf6bd04f47ba78319056bc950e726b3232090cfb2fbe771aeee62

