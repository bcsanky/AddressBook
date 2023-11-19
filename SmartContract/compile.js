const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'Contract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        main: { content: source, },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = solc.compile(JSON.stringify(input));
const contract = JSON.parse(output).contracts.main['Contract'];

const outputPath = path.resolve(__dirname, "build");
fs.ensureDirSync(outputPath);
fs.outputJsonSync(
    path.resolve(outputPath, 'Contract.json'),
    contract
);

module.exports = {
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object,
};
