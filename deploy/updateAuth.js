const Eos = require('eosjs');
const httpEndpoint = process.env.BP || 'https://api.eosnewyork.io';
const chainId = process.env.ID || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';
//修改：合约账号部署的私钥
const key = process.env.PRI_KEY || '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';

const config = {
    keyProvider: [key],

    httpEndpoint: httpEndpoint, // mainNet bp endpoint
    chainId: chainId, // 通过cleos get info可以获取chainId
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission


};
const eos = Eos(config);


var auth_body = {
    "account": "ubetubetubet",
    "permission": "active",
    "parent": "owner",
    "auth": {
        "threshold": 1,
        //todo 修改为游戏合约的公钥
        "keys": [{"key": "EOS5FCsgycYRYLrJqWTgvc3wjtBJLKVjVzdBGraTBpLmHnMMctVHL", "weight": 1}],
        "accounts": [
            {
                "permission": {
                    "actor": "ubetubetubet",
                    "permission": "eosio.code"
                },
                "weight": 1
            }
        ],
        "waits": []
    }
};
// Publish contract to the block chain net
eos.updateauth(auth_body).then(result => {
    console.log(result)
});
