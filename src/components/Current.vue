<style>
    .current-block {
        /* padding: 1px 1px; */
        overflow: hidden;
        display: flex;
        align-items: center;
        margin: 1px;
    }

    .current-block .demonstration {
        font-size: 14px;
        line-height: 35px;
        /* display: inline-flex; */
        /* margin-right: 1%; */
        /* margin-left: 1%; */
        margin-top: 1px;
    }

    .el-dialog {
        background: #000820;
    }

    .current-block .demonstration + .el-progress {
        width: 60%;
    }

    .eco-fun-balance {
        font-size: 20px;
    }

    .last-luckyinfo {
        font-size: 20px;
        color: #fe5000;
    }

    .drop-rate {
        font-size: 20px;
    }

    /* .col-md-2 {
      width: 30%;
    }
    .col-md-10 {
      width: 100%;
    } */
    .current {
        margin-top: 65px !important;
    }

    .el-table__body tr.hover-row > td {
        background-color: #1e3579 !important;
    }

    .my_current_cards {
        margin: 0.5em;
        font-size: 1em;
        text-align: center;
        text-shadow: 0 0 0.1em rgb(9, 207, 221), -0 -0 0.1em rgb(223, 9, 62);
    }

</style>
<style scoped>
    .el-dialog__title {
        color: #dfe4ef;
    }

    .claim{
        color: #dfe4ef !important;
        width:40px;
        text-shadow: 0 0 0.1em rgb(27, 213, 226), -0 -0 0.1em #f87;
    }

    .el-carousel__item span {
        align-items: center;
        color: #ea0302;
        font-size: 14px;
        opacity: 0.9;
        line-height: 50px;
        /*margin: ;*/
        position: relative;
        text-align: center;
        /*top: 35%;*/
        vertical-align: middle;
        display: block;

    }

    .el-carousel__item:nth-child(1) {
        background-color: #FFD700;
    }

    .el-carousel__item:nth-child(2) {
        background-color: rgb(233, 233, 216);
    }

    .el-carousel__item:nth-child(3) {
        background-color: #B87333;
    }

    .el-carousel {
        margin: 10px 1%;
    }

    .el-carousel__item {
        border-radius: 10px;
    }

    .el-carousel__container {
        height: 30px !important;
    }

    .invest-block {
        border-color: rgb(54, 49, 87);
        border-width: 2px !important;
        border-radius: 5px;
    }

    .el-progress-bar {
        color: rgb(255, 119, 75) !important;
    }

    .el-progress-bar__outer {
        box-shadow: 0px 0px 12px 1px #f213d9 !important;
    }

    .el-button--text span {
        color: aqua !important;
    }

    .el-slider__button {
        border-radius: 30%;
        background-color: #409eff;
    }

    .el-input-number__decrease, .el-input-number__increase {
        background: transparent !important;
    }

    .action_button2:hover {
        background-color: #008CBA;
        color: white;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);

    }

    .action_button2 {
        background-color: white;
        color: black;
        border: 2px solid #008CBA;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .action_button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 8px 30px;
        text-align: center;
        text-decoration: none;
        /*display: inline-block;*/
        font-size: 12px;
        margin: 1px 2px;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        cursor: pointer;
        border-radius: 10%;
        flex: 1;
        outline: none;
    }
    .claim{
        margin:10px 100px;
        border-radius:8%;
        padding: 8px 10px;

    }

    .el-row {
        margin: 20px 1px;
    }


</style>


<template>
    <div class="container-fluid  row current">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>游戏中心</span>
            </div>
            <div class="container-fluid">
                <el-carousel arrow="never" indicator-position="none" :interval="3000" type="card" height="50px">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <span>{{lastLuckyInfo[item]}}</span>
                    </el-carousel-item>
                </el-carousel>

                <div class="current-block row">
                    <span class="demonstration col-md-2">第{{global.gameid}}局进度</span>
                    <el-progress :text-inside="false" :stroke-width="18" :percentage="progress"
                    ></el-progress>
                </div>
                <div class="current-block row">
                    <span class="demonstration col-md-3">空投概率</span>
                    <span class="drop-rate col-md-3">{{air_drop_prob}}%</span>
                    <span class="demonstration col-md-3">空投次数</span>
                    <span class="drop-rate col-md-3">{{air_drop_count}}</span>
                </div>
                <div class="current-block row">
                    <span class="demonstration col-md-3">下一次分红</span>
                    <span class="col-md-3">{{next_profit_sharing_time}}</span>
                    <button class="action_button action_button2 claim col-md-1"  @click="getShares">领取</button>

                    <el-dialog title="分红" :visible.sync="dialogTableVisible" width="90%">
                        <el-table :data="shares">
                            <el-table-column property="id" label="期号"></el-table-column>
                            <el-table-column property="end_time" label="结束时间"></el-table-column>
                            <el-table-column property="eco_fund_snapshoot" label="分红池"></el-table-column>
                            <el-table-column property="reward" label="我的奖励"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClaim(scope.row)" type="text" size="small">领取</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>

                </div>

                <div class="invest-block" style="border-style: solid;border-width: 10px;margin-top: 5px;">
                    <el-slider style="margin:15px 15px;" v-model="invest" show-input :step="1" show-stop :min=1
                               :max=100></el-slider>

                    <!--<div class="inveset-block__balance current-block row">-->
                    <el-row type="flex" justify="space-around" :gutter="20">

                        <el-col :span="6">
                            <img class="eos_balance" src="../assets/images/eos.png" width="15px"/>
                            <span class="eos_balance" balance> {{balance}}</span>
                        </el-col>
                        <el-col :span="6">
                            <button class="action_button action_button2 invest_btn" @click="handleInvest">投资</button>
                        </el-col>
                        <el-col :span="6">
                            <!--<el-button class="balance_1" type="primary" @click="handleInvest">投注</el-button>-->
                            <img class="game_balance" src="../assets/images/game_token.png" width="20px"/>
                            <span class="game_balance" balance> {{game_balance}}</span>
                        </el-col>
                    </el-row>
                </div>

            </div>

        </el-card>
    </div>
</template>

<script>
    import config from "../config/config";
    import utils from "../utils/utils";
    import EOS from "eosjs";

    export default {
        data() {
            return {
                invest: 1,
                balance: "",
                game_balance: "",
                lastLuckyInfo: {1: "虚位以待", 2: "虚位以待", 3: "虚位以待"},
                airDropRate: 0,
                interVal: null,
                global: "",
                progress: 0,
                air_drop_count: 0,
                air_drop_prob: 0,
                eco_fund_balance: "0 EOS",
                next_profit_sharing_time: "",
                total_dapp_token_hold: 0,
                shares: [],
                dialogTableVisible: false,
                myuniqueInfo: {},
                mycards: "本局未参与！",
                shareid: 0,
            };
        },
        methods: {
            handleInvest() {
                let self = this;
                self.$store.commit("setActionTime", new Date().getTime());
                if (this.$store.state.userName == "") {
                    console.log("scatter is not login!");
                    self.$message({
                        message: "请先登录！",
                        type: "warn",
                        duration: 1000,
                        center: true
                    });
                    return;
                }
                // var ref = this.$route.params;
                let ref = utils.getUrlKey("ref");

                var from = this.$store.state.userName;
                var to = config.gameContract;
                var amount = this.invest.toFixed(4) + " " + config.mainToken;
                var memo = ref == null ? "" : ref;

                // alert(this.$store.state.scatterEosClient==null)
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos
                    .transfer({from: from, to: to, quantity: amount, memo: memo})
                    .then(tx => {
                        self.$message({
                            message: "成功",
                            type: "success",
                            duration: 1000,
                            center: true
                        });
                        self.$store.commit("setActionTime", new Date().getTime);
                    })
                    .catch(e => {
                        self.$message({
                            message: "转账失败",
                            type: "error",
                            duration: 1000,
                            center: true
                        });
                    });
            },
            handleClaim(row) {
                let self = this;
                if (self.$store.state.userName == "") {
                    self.$message({
                        message: "请登陆",
                        type: "warning",
                        duration: 2000,
                        center: true
                    });
                    return;
                }
                const account = window.scatter.identity.accounts.find(
                    account => account.blockchain === "eos"
                );
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos
                    .transaction({
                        actions: [
                            {
                                account: config.gameContract,
                                name: "claim",
                                authorization: [
                                    {
                                        actor: account.name,
                                        permission: account.authority
                                    }
                                ],
                                data: {
                                    account: account.name,
                                    shareid: row.id
                                }
                            }
                        ]
                    })
                    .then(tx => {
                        self.$message({
                            message: "成功",
                            type: "success",
                            duration: 1000,
                            center: true
                        });
                        self.getClaim();
                    })
                    .catch(e => {
                        console.error(e);
                        self.$message({
                            message: "失败！",
                            type: "error",
                            duration: 1000,
                            center: true
                        });
                    });
            },
            getClaim() {
                let self = this;
                let eos = self.$store.state.eosClient;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: self.$store.state.userName,
                        table: "claims",
                        limit: 10,
                        lower_bound: 0
                    })
                    .then(data => {
                        var dataRows = data.rows;
                        if (dataRows.length > 0) {
                            let myrecordsDummy = [];
                            for (let index in dataRows) {
                                let dataInfo = dataRows[index];
                                let dataTmp = self.myuniqueInfo[dataInfo.share_id];
                                if (dataTmp) {
                                    dataTmp.reward = dataInfo.reward;
                                }
                            }

                            for (let items in self.myuniqueInfo) {
                                myrecordsDummy.push(self.myuniqueInfo[items]);
                            }
                            self.shares = myrecordsDummy.reverse();
                            // self.shares.sort(utils.compare);
                        } else {
                            console.log("claim is net exist!");
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            },
            getShares() {
                this.dialogTableVisible = true;
                let self = this;
                let eos = self.$store.state.eosClient;
                let lower_bound = self.shareid < 10 ? 0 : self.shareid - 9;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: config.gameContract,
                        table: "shares",
                        limit: 10,
                        lower_bound: lower_bound
                    })
                    .then(data => {
                        if (data.rows.length < 1) {
                            console.log("no history record!");
                        } else {
                            // reverse()
                            let dataInfo = data.rows;
                            self.shares = dataInfo
                                .map(data => {
                                    data.end_time = new Date(data.end_time * 1000)
                                        .toLocaleString()
                                        .replace(/:\d{1,2}$/, " ");
                                    if (!self.myuniqueInfo[data.id]) {
                                        self.myuniqueInfo[data.id] = data;
                                    }
                                    return data;
                                })
                                .reverse();
                            self.getClaim();
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            },
            getGlobalInfo() {
                let self = this;
                let eos = self.$store.state.eosClient;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: config.gameContract,
                        table: "global",
                        limit: 10,
                        lower_bound: 0
                    })
                    .then(data => {
                        if (data.rows && data.rows.length > 0) {
                            let globalData = data.rows[0];
                            self.global = globalData;
                            self.$store.commit("setGlobalInfo", self.global);
                            self.progress = (globalData.operator_count) % 100;
                            self.air_drop_count = globalData.air_drop_count;
                            self.air_drop_prob = globalData.air_drop_prob;
                            self.eco_fund_balance = globalData.eco_fund_balance;
                            self.next_profit_sharing_time = new Date(
                                globalData.next_profit_sharing_time * 1000
                            )
                                .toLocaleString()
                                .replace(/:\d{1,2}$/, " ");
                            self.total_dapp_token_hold = globalData.total_dapp_token_hold;
                            self.shareid = globalData.shareid;
                            console.log(globalData.shareid);
                            eos
                                .getTableRows({
                                    json: "true",
                                    code: config.gameContract,
                                    scope: config.gameContract,
                                    table: "game",
                                    upper_bound: globalData.gameid,
                                    lower_bound: globalData.gameid - 1 //now 20 ,just get 19,because 20 is not open reward
                                })
                                .then(data => {
                                    let recent = data.rows[0];
                                    if (!recent) {
                                        return;
                                    }
                                    let recentInfo = {
                                        1: "一等奖:\n" + parseFloat(recent.lucky_reward_1) + "EOS/" + recent.lucky_man_1,
                                        2: "二等奖: \n" + parseFloat(recent.lucky_reward_2) + "EOS/" + recent.lucky_man_2,
                                        3: "三等奖: \n" + parseFloat(recent.lucky_reward_3) + "EOS/" + recent.lucky_man_3,
                                    };
                                    self.lastLuckyInfo = recentInfo;
                                })
                                .catch(e => {
                                    console.error(e);
                                });
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        },
        created() {
            var self = this;
            self.getGlobalInfo();
        },
        watch: {
            "$store.state.actionTime": function () {
                this.getGlobalInfo();
                if (this.$store.state.userName == "") {
                    return;
                }
                this.$store.state.eosClient
                    .getCurrencyBalance({
                        account: this.$store.state.userName,
                        code: config.tokenContract,
                        symbol: config.mainToken
                    })
                    .then(result => {
                        this.balance = result[0];
                    });
                this.$store.state.eosClient
                    .getCurrencyBalance({
                        account: this.$store.state.userName,
                        code: config.gameTokenContract,
                        symbol: config.gameToken
                    })
                    .then(result => {
                        this.game_balance = result[0];
                    });
            },
            "$store.state.globalInfo": function () {
                if (this.$store.state.globalInfo == "") {
                    return;
                }
                // this.lastLuckyInfo = this.$store.state.recentRewardInfo;
                let self = this;
                self.$store.state.eosClient
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: self.$store.state.globalInfo.gameid,
                        table: "round",
                        limit: 20,
                        lower_bound: 0
                    })
                    .then(data => {
                        var mycardsInfo = "本局幸运卡: ";
                        var mycards = [];

                        let newDataFlag = false;
                        if (data.rows && data.rows.length > 0) {
                            let rounfInfo = data.rows;
                            rounfInfo
                                .filter(y => {
                                    if (y.player_name == self.$store.state.userName) {
                                        newDataFlag = true;
                                        return true;
                                    }
                                })
                                .map(data => {
                                    mycards.push(data.lucky_num);
                                });
                            self.mycards = newDataFlag ? mycardsInfo + mycards.join() : self.mycards;
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        },
        beforeDestory() {
            clearInterval(this.interVal);
        }
    };
</script>
