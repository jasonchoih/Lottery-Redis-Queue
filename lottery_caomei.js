//
const { caomei, ocean } = require('./config/config');
const { redis_sd28_pub, redis_lottery_get, redis_lottery_set } = require('./tool/redis');
//
const redis = require("redis");
// 
// const redis_caomei_subs = redis.createClient(caomei); // Tencent Server
const redis_caomei_subs = redis.createClient(ocean); // Digital Ocean Server 
// 
const sub_name = 'lottery_caomei_data';
const pub_admin = 'sd28-admin-data';
const lottery_caomei_new_data = 'lottery_caomei_new_data';
// 
// lottery_caomei_data {"elg":["3152239","2022-01-17 07:04:00"]}
// 
const lottery_caomei_new_data_set = async(d) => 
{
    let _d = d;
    const _od = await redis_lottery_get(lottery_caomei_new_data);
    // console.log(_od);
    if(_od) _d = { ..._od, ...d };
    await redis_lottery_set(lottery_caomei_new_data, _d);
    return _d;
}
// 
const startSub = async() => 
{
    redis_caomei_subs.subscribe(sub_name);
    redis_caomei_subs.on("message", async(channel, message) =>
    {
        // console.log(channel, message);
        try {
            const m = JSON.parse(message);
            const LotteryNewCaomei = await lottery_caomei_new_data_set(m);
            // console.log(LotteryNewCaomei);
            await redis_sd28_pub(pub_admin, JSON.stringify({ LotteryNewCaomei }));
        } catch (error) {
            
        }
    })
}
// 
startSub();