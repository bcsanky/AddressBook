import web3 from './web3'
import userContract from './build/Contract.json'

const instance = new web3.eth.Contract(
  userContract.abi,
  '0x71E6115257cc3989Ec0415Ce28449B4FA011d9FF'
);

export default instance;
