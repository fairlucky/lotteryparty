const eosjs_config = require('./eosjs_config');
const fs = require('fs');

const eos = eosjs_config.eos;


const wasm = fs.readFileSync(`./contract/eosio.token.wasm`);
const abi = fs.readFileSync(`./contract/eosio.token.abi`);

// async
(async function () {

    // Options may be provided after parameters.
    var options = {
        authorization: 'ubetubetubet@active', //填写合约账户名
        broadcast: true,
        sign: true
    };

    // Publish contract to the block chain net
    await eos.setcode('ubetubetubet', 0, 0, wasm, options);//填写合约账户名
    await eos.setabi('ubetubetubet', JSON.parse(abi), options);//填写合约账户名

    // Fetch contract info
    console.log('contract deployed:', await eos.contract('eosio'));
    sleep(10000);
})().catch(console.error);



