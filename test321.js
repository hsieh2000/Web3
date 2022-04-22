var Tx = require('ethereumjs-tx').Transaction

const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/2316bc0ab1eb4f4c8f3b404864eb8d18')


const account1 = '0xd638a539E2A504E5a3A4aF0F6D7f98d6631C5d7B'

const account2 = '0xd8F1e9e8c11e2A26D2bC070d528E01C572E953C4'

const privateKey1 = Buffer.from('e3ce21d341437a3296ddc34e4ccf79cc19082a5ea74dc6e7d3454ab3c853c72c', 'hex')

web3.eth.getTransactionCount(account1, (err, txCount) => {

    // Build the transaction
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      from: account1,
      to: account2,
      value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }


    // Sign the transaction
    const tx = new Tx(txObject,{'chain':'ropsten'})
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw).on('receipt', console.log);
      // Now go check etherscan to see the transaction!
  })