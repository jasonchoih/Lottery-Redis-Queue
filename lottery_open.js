//
const { redis_lottery_brpop, redis_lottery_lrange } = require('./tool/redis');
const { gameIn } = require('./tool/gameOpt');
// 
const sub_list = 'lottery_open_list';
//
const startWaitMsg = async() => 
{
    while(true) {
        let res = null;
        try {
            res = await redis_lottery_brpop(sub_list, 0);
            // console.log(res);
            const d = JSON.parse(res[1]);
            // console.log(d);
            await gameIn(d);
        }
        catch(err) {
            // console.log('brpop 出错，重新brpop')
            continue
        }
        // 
        // const d = JSON.parse(res[1]);
        // console.log(d);
        // await gameIn(d);
    }
}
// 
startWaitMsg();