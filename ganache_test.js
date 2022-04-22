const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:7545')

const account1 = '0x59af3435f88E76b24a931Cb147695E5236E7c83f'
const account2 = '0x429f5569B98F09d7e5bd1B4E69BEC53e8a97800C'

web3.eth.sendTransaction({ from: account1, to: account2, value: web3.utils.toWei('1','ether')})

web3.eth.getBalance(account1,(err, result) => { console.log(result) })