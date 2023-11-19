const { Web3 } = require('web3');
const { abi, bytecode } = require('./compile');

// based on
// https://docs.infura.io/tutorials/ethereum/deploy-a-contract-using-web3.js

// wallet 
// https://sepolia.etherscan.io/address/0xc06deb9887c03c6234526fdf385817651a931d60

const NETWORK = 'sepolia';
const INFURA_API_KEY = 'f0e4cdc2044a4aaa8c44be7b19df9f94';
const SIGNER_PRIVATE_KEY = 'd17f32f5af43400163b628da80d44027fbf2e591e7470eea20685c60c03265d5';

var web3 = new Web3(`https://${NETWORK}.infura.io/v3/${INFURA_API_KEY}`);

const deploy = async () => {
    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
        '0x' + SIGNER_PRIVATE_KEY,
    );
    web3.eth.accounts.wallet.add(signer);

    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(abi);
    contract.options.data = bytecode;

    const deployTx = contract.deploy();
//  var estimate = await deployTx.estimateGas();
    const gas_limit = 2500000n;

    const deployedContract = await deployTx
    .send({
        from: signer.address,
        gas: gas_limit,
    })
    .once("transactionHash", (txhash) => {
        console.log(`Mining deployment transaction ...`);
        console.log(`https://${NETWORK}.etherscan.io/tx/${txhash}`);
    });

    console.log('Contract deployed to', deployedContract._address);
};

deploy();
