const eosjs_config = require('./eosjs_config');

const eos = eosjs_config.eos;


//创建游戏代币100000000.0000 UBET，创建者fairubetubet
eos.transaction(
    {
        actions: [
            {
                account: 'fairubetubet',  //合约名
                name: 'create',               //方法名，该方法在官方的hello合约中有
                authorization: [{
                    actor: 'fairubetubet',
                    permission: 'active'
                }],
                data: {
                    issuer: "fairubetubet",
                    maximum_supply: "100000000.0000 UBET",  //todo 小数点
                }
            }
        ]
    }
    // options -- example: {broadcast: false}
).then(result => {
    console.log("result", result);

})

//发币给游戏合约:ubetubetubet,10000000.0000 UBET
eos.transaction(
    {
        actions: [
            {
                account: 'fairubetubet',  //合约名
                name: 'issue',               //方法名，该方法在官方的hello合约中有
                authorization: [{
                    actor: 'fairubetubet',
                    permission: 'active'
                }],
                data: {
                    to: "ubetubetubet",
                    quantity: "10000000.0000 UBET",  //todo 小数点
                    memo:''
                }
            }
        ]
    }
).then(result => {
    console.log("result", result);

})