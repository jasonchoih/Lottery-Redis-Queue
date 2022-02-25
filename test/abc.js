// 
const sub_name = 'lottery_open_data';
const sub_list = 'lottery_open_list'; 
//
const { 
    //
    redis_sd28_pub,
    redis_sd28_lpush,
    //
    redis_lottery_set,
    redis_lottery_llen,
    redis_lottery_list,
    redis_lottery_lindex,
    redis_lottery_lset,
    redis_lottery_lpush,
    redis_lottery_ltrim,
    redis_lottery_setex,
    redis_lottery_lrange,
    redis_lottery_rpop,
    // 
    redis_us_subs
    //
} = require('../tool/redis');
// 
const dayjs = require("dayjs");
const { getNextPeroidsTime } = require('../tool/gameTime');
const { getGameType, gameBetDatas, gamePwin } = require('../tool/gameTool');
const { ycIn } = require('../tool/gameYc');
//
const lottery_list_fix = 'lottery_list_';
const lottery_last_fix = 'lottery_last_';
const lottery_fou_fix = 'lottery_fou_';
//
const fouFind = async(d)=>
{
    const { _old, category, peroids } = d;
    // 
    const _f = _old.find(v=>v.peroids==peroids);
    if(_f) return _f.p;
    return await gameBetDatas(category)
}
// 
const test = async(d)=>
{
    const { category, peroids, time } = d;
    // 
    const _n = 'test_'+lottery_fou_fix+''+category;
    const _old = await redis_lottery_list(_n, 0, -1);
    let _time = time;
    let _send = [];
    //
    for(let i=1;i<5;i++)
    {
        const _peroids = parseInt(peroids)+i;
        const _next = await getNextPeroidsTime(category, _time);
        // 
        const _f = _old.find(v=>v.peroids==_peroids);
        //
        if(!_f)
        {
            await redis_lottery_lpush(_n, JSON.stringify({
                peroids: _peroids,
                time: _next.time,
                p: await gameBetDatas(category)
            }));
        }else{
            const _i = _old.findIndex(v=>v.peroids==_peroids);
            if(_i!==-1)
            {
                await redis_lottery_lset(_n, _i, JSON.stringify({
                    peroids: _peroids,
                    time: _next.time,
                    p: _f.p
                }));
            }
        }
        //
        _time = _next.time;
    }
    await redis_lottery_ltrim(_n,0,4);
    const _new = await redis_lottery_list(_n, 0, -1);
    console.log(_n, _new);
}
// 
// test({
//     category: 'jnd'
// });
const startSub = async() => 
{
    redis_us_subs.subscribe(sub_name);
    redis_us_subs.on("message", async(channel, message) =>
    {
        console.log(channel, message);
        // try {
        //     await redis_lottery_lpush(sub_list, message);
        // } catch (error) {
            
        // }
        // 
        const d = JSON.parse(message);
        await test(d);
        // 
    })
}
// 
startSub();