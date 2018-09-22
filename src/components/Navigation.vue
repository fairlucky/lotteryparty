<style>
    .el-menu--horizontal {
        border-right: none;
        border-bottom: 0;
    }

    .el-menu-demo img {
        width: 120px;
        height: 45px;
    }

    .el-menu-demo {
        position: fixed;
        z-index: 102;
        width: 100%;
        /*text-shadow: 0 0 0.2em rgb(27, 213, 226), -0 -0 0.2em #f87;*/
        text-shadow: 0 0 0.05em rgb(27, 213, 226), -0 -0 0.1em #f87;


    }

    svg:not(:root).svg-inline--fa:hover {
        background-color: #6C2DED;
    }

    svg:not(:root).svg-inline--fa {
        border-radius: 25%;
        border-width: medium;
        /*padding: 10px;*/
        cursor: pointer;
        font-size: 1.2em;
        transition: background-color ease 200ms;
    }

    .el-dialog {
        background: #00040d !important;
        text-shadow: 0 0 0.05em rgb(27, 213, 226), -0 -0 0.1em #f87;

    }

    .el-dialog__header {
        color: #f8f7ff !important;
    }

    .el-dialog__body {
        color: #fafafa;
        text-shadow: 0 0 0.05em rgb(27, 213, 226), -0 -0 0.1em #f87;


    }

    .el-dialog__body p {
        color: #0f4dfa;
        text-align: center;
        font-size:small;
    }

    .referral_name {
        text-align: center;display:block;
        color: aqua;
        margin: 15px 0px;
    }
</style>
<style scoped>
    .el-col-6 {
        text-align: center;
    }
</style>

<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#000819"
                 text-color="#fff" active-text-color="#66b1ff">
            <el-menu-item index="0">
                <img src="../../public/fairicon.png"/>
            </el-menu-item>
            <!--<el-menu-item id="trading_btn" index="1">交易</el-menu-item>-->
            <el-menu-item index="1" @click="checkIn">签到</el-menu-item>
            <el-menu-item id="ref_btn" index="2" @click="showRef=true">邀请奖励</el-menu-item>
            <el-menu-item id="community_btn" index="3" @click="showSocial=true">社区</el-menu-item>
            <el-menu-item id="howtoplay_btn" index="4" @click="showHow=true">玩法说明</el-menu-item>
            <el-menu-item v-if="!islogin" @click="login" style="float:right" index="5">登录</el-menu-item>
            <el-submenu v-if="islogin" index="5" style="float:right">
                <template slot="title">{{username}}</template>
                <el-menu-item index="5-1" @click="logout">退出</el-menu-item>
            </el-submenu>
        </el-menu>

        <el-dialog id="community_dialog" width="60%"
                   :visible.sync="showSocial">
            <p slot="title" style="color: #fafafa;text-shadow: 0 0 0.1em rgb(27, 213, 226), -0 -0 0.1em #f87;">加入社区</p>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <span @click="navigate('twitter')">
                        <font-awesome-icon :icon="['fab', 'twitter']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('github')">
                        <font-awesome-icon :icon="['fab', 'github']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('medium')">
                        <font-awesome-icon :icon="['fab', 'medium-m']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('discord')">
                        <font-awesome-icon :icon="['fab', 'discord']"/>
                    </span>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
                width="60%"
                :visible.sync="showRef">
            <p slot="title">推荐获取更多奖励</p>
            <span class="referral_name">http://ubet.info?ref={{userName}} </span>

            <p>复制你的推荐链接给朋友，终身获得其10%的投注！你的任何疑问都可以在社区中被回答，那么快快加入吧！</p>
        </el-dialog>

        <el-dialog
                width="60%"
                :visible.sync="showHow">
            <p slot="title">如何游戏</p>
            <ol>
                <li>确保你有一个EOS账户，如果你没有请进官方社区，会有人帮助你！
                </li>
                <li>如果你使用电脑玩，请确保你的chrome浏览器安装了Scatter！<a href="//get-scatter.com/"
                                                         target="_blank">Scatter</a>
                </li>
                <li>如果一切就绪，那就开始游戏吧！你可以投注多个EOS，拿到你的幸运卡片和系统奖励！</li>
                <li>接下来你可以进行一次签到，继续获取系统奖励！</li>
                <li>如果本局游戏结束，那么就期待一下你会是那个幸运儿吧！</li>
            </ol>
            <p>你的任何疑问都可以在社区中被回答，那么快快加入吧！</p>
        </el-dialog>
    </div>
</template>

<script>
    import EOS from "eosjs";
    import config from "../config/config";

    export default {
        data() {
            return {
                activeIndex: "0",
                userName: "",
                islogin: false,
                dialogVisible: false,
                alertInfo: "",
                alertTitle: "",
                eosClient: null,
                scatterEosClient: null,
                interval: null,
                showSocial: false,
                showHow: false,
                showRef: false
            };
        },
        methods: {
            getrefferInfo() {
                return "http://ubet.info?ref=" + this.userName;
            },
            navigate(brand) {
                switch (brand) {
                    case 'twitter':
                        window.open('//twitter.com/ubeteosgame');
                        break;
                    case 'medium':
                        window.open('//medium.com/ubeteosgame');
                        break;
                    case 'github':
                        window.open('//github.com/ubeteosgame');
                        break;
                    case 'discord':
                        window.open('//discordapp.com/channels/482077322070196225/487187255065313292');
                        break;
                }
            },
            login() {
                let self = this;
                if (window.scatter == null) {
                    self.$message({
                        message: "请安装scatter！",
                        type: "warning",
                        duration: 3500,
                        center: true
                    });
                    window.open(
                        "https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
                    );
                }
                let clientType = this.getClientType();
                window.scatter
                    .getIdentity({
                        accounts: [config.eosNetwork]
                    })
                    .then(identity => {
                        if (identity && identity.accounts.length > 0) {
                            this.account = identity.accounts.find(
                                account => account.blockchain === "eos"
                            );
                            self.username = this.account.name;
                            self.islogin = true;
                            self.$store.state.userName = self.account.name;
                            self.$store.state.actionTime = new Date().getTime();
                            self.$message({
                                message: "登录成功",
                                type: "success",
                                duration: 1500,
                                center: true
                            });
                        }
                    })
                    .catch(error => {
                        self.$message({
                            message: "登录失败！",
                            type: "error",
                            duration: 1500,
                            center: true
                        });
                    });
            },
            logout() {
                let self = this;
                window.scatter.forgetIdentity().then(() => {
                    self.islogin = false;
                    self.$message({
                        message: "退出成功！",
                        type: "success",
                        duration: 1000,
                        center: true
                    });
                });
                self.$store.commit("setUserName", "");
            },
            checkIn() {
                var self = this;

                function login_event(event) {
                    self.login();
                }

                if (self.$store.state.userName == "") {
                    self.$message({
                        message: "请先登录！",
                        type: "warning",
                        duration: 1000,
                        center: true,
                        onClose: login_event
                    });
                    return;
                }
                const account = window.scatter.identity.accounts.find(
                    account => account.blockchain === "eos"
                );

                // const options = {
                //   authorization: [`${account.name}@${account.authority}`]
                // };
                // hard code
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos.transaction({
                    actions: [
                        {
                            account: config.gameContract,
                            name: "check",
                            authorization: [
                                {
                                    actor: account.name,
                                    permission: account.authority
                                }
                            ],
                            data: {
                                account: account.name
                            }
                        }
                    ]
                }).then(tx => {
                    self.$message({
                        message: "签到成功！",
                        type: "success",
                        duration: 1000,
                        center: true
                    });
                    self.$store.commit("setActionTime", new Date().getTime());
                }).catch(error => {
                    self.$message({
                        message: "签到失败！",
                        type: "error",
                        duration: 1500,
                        center: true
                    });
                });
            },
            handleClose(done) {
                done();
            },
            getClientType() {
                var u = navigator.userAgent,
                    w = window.location.href,
                    t = this.parseUrl(w);
                if (u.match(/Windows|/i) != null) {
                    return "window";
                }
                if (u.match(/Android/i) != null) {
                    //android设备
                    return "Android";
                } else if (u.match(/iPhone|iPod/i) != null) {
                    //IOS
                    return "IOS";
                } else {
                    return "WP";
                }
            },
            //取p值
            parseUrl(url) {
                var pattern = /(\w+)=([^\#&]*)/gi,
                    parames = {};
                url = url || window.location.href;
                url.replace(pattern, function (attr, key, value) {
                    parames[key] = decodeURI(value);
                });
                return parames;
            }
        },
        created() {
            let self = this;
            if (this.interval) {
                clearInterval(this.interval);
            }

            self.eosClient = EOS(config.eosOptions);
            self.$store.commit("setEosClient", EOS(config.eosOptions));
            document.addEventListener("scatterLoaded", scatterExtension => {
                let scatter = window.scatter;
                scatter.requireVersion(3.0);
                self.scatterEosClient = scatter.eos(
                    config.eosNetwork,
                    EOS,
                    config.eosOptions
                );
                self.$store.commit("setScatterClient", self.scatterEosClient);
            });
            this.interval = setInterval(() => {
                self.$store.commit("setActionTime", new Date().getTime());
            }, 15000);
        },
        beforeDestory() {
            clearInterval(this.interVal);
        }
    };
</script>
