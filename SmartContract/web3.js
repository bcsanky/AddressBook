const { Web3 } = require('web3')

const NETWORK = 'sepolia';
const INFURA_API_KEY = 'f0e4cdc2044a4aaa8c44be7b19df9f94';

let web3

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
}
else {
  web3 = new Web3(`https://${NETWORK}.infura.io/v3/${INFURA_API_KEY}`);
}

export default web3;
