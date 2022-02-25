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
const gamePeroidsTimex = async(category) => 
{
    const winter = {
        jnd: [210, '20:00:00', 3600],
        ddbj: [300, '23:55:00', 25800],
        jnc: [300, '17:30:00', 7200],
        slfk: [300, '06:50:00', 18600],
        elg: [240, '19:56:00', 9360],
        au: [160, '00:00:00', 160],
        btc: [60, '00:00:00', 60],
        kr: [90, '00:00:00', 90],
    }
    if(['jnd','jnc','elg','slfk'].find(v=>v==category) && await getYearSummerDay())
    {
        const summers = {
            jnd: [210, '19:00:00', 3600],
            jnc: [300, '16:30:00', 7200],
            slfk: [300, '05:50:00', 18600],
            elg: [240, '18:56:00', 9360]
        }
        return summers[category];
    }
    return winter[category];
}
// 
// 四期投注情况 // Sì qí tóuzhù qíngkuàng
const fouIn = async(category, peroids, time) => 
{
    // const { category, peroids, time } = d;
    //
    // console.log('-----------------',category, peroids, time);
    const _n = lottery_fou_fix+''+category;
    const _old = await redis_lottery_list(_n, 0, -1);
    // console.log(_old);
    let _time = time;
    let _send = [];
    //
    const _next = await getNextPeroidsTime(category, _time);
    //
    console.log(_next); 

    // return await getNextPeroidsTime(category, _time);
    // if(_next.stop) return;
    
    for(let i=1;i<5;i++)
    {
        const _peroids = parseInt(peroids)+i;
        if(!_old.find(v=>v.peroids==_peroids))
        {
            _send.unshift({
                peroids: _peroids,
                time: _next.time,
            });
            console.log(_send);
            // await redis_lottery_lpush(_n, JSON.stringify({
            //     peroids: _peroids,
            //     time: _next.time,
            //     p: await gameBetDatas(category)
            // }));
        }
        _time = _next.time;
    }

    // //
    // await redis_lottery_ltrim(_n,0,4);
    // // 
    // if(_send&&_send.length>=1)
    // {
    //     await sendNew(category, _send[0]);
    // }
    // // 
    // await sendQunNew(d);
    // const _li = await redis_lottery_lrange(_n,0,-1);
    // console.log(category,_li);
};

const test = async() =>
{
    const _t = await fouIn('jnd','2785053', '2021-11-18 19:28:30');
}
test();