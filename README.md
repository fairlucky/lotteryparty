##  LOG 幸运之门
 
    log是基于eos的智能游戏合约，不依赖中心化服务器，数据全部上链，所以我们不用设计前端，真正实现公平公开的游戏。
    秉承去中心化原则，后期代码会全部开源，团队会放弃合约权限，移交至黑洞地址
    目前处于早鸟运营期，越早加入可获取更多lotteryparty权证LP。
    
## 游戏玩法：
    1、购买：直接向lotteryparty合约转账，每次购买操作限额1个EOS，多转或者少转都会被视为参与失败被退回。
            间隔5s才能进行下一次购买,购买成功后会自动收到合约的买入提醒。
    
    2、规则：每局100张幸运卡，每张幸运卡需要1个EOS购买。系统会有一定概率在每次用户购买时进行空投。
            目前每局游戏数据需要消耗2kb内存。(如果游戏成为爆款，内存将被持续购买，各位的ram解套有望！)
    3、开奖：当一局的100张幸运卡售完时，合约会根据当前时间等使用xoroshiro128算法产生随机数，产生最终幸运卡号(合约保证每局必定有随机幸运儿)，
            最终获取奖池的90%(9个EOS)，同时获取lotteryparty权证LP 10个。奖池中剩余5%EOS，将进入权益池，不久会分红给所有LP权证持有者！

    说明：LP权证总量100000000个，将全部分发给社区参与者，团队不会持有份额。
          游戏不设置拉人返佣是因为我们相信好的游戏不需要被忽悠，而LP就是你的权益。
          本游戏开发初心是为了依托区块链，建立真正公平公开的规则，同时也是为了刺激EOS ram市场的活力！
          本游戏是团队的小试牛刀，更多游戏敬请期待！
                                                                                         
本游戏开源仅用于个人进行测试网络研究区块链技术，推动社会向着更好的方向发展，如果有用于商业用途，产生的任何事故纠纷均与本项目无关。
如果你喜欢EOS，并觉得本项目对你的认识有帮助，那么请喝个咖啡吧！

#### EOS捐赠地址：lotteryparty
