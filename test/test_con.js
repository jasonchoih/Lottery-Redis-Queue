const { promisify } = require("util");
const redis = require("redis");
// 
const us =  {
    port: 6379,
    host: '54.86.1.51',
    password: 'c&QHG&t5zG+e*a_3v<u/',
    db: 0,
};
//
//
// const { redis_us_subs, redis_lottery_lpush, redis_lottery_lrange } = require('./tool/redis');
const redis_us_subs = redis.createClient(us);
// 
const sub_name = 'lottery_open_data';
const sub_list = 'lottery_open_list';
// 
// {
//     category: 'btc',
//     peroids: 1787538,
//     time: '2021-06-26 20:31:00',
//     number: [
//        3,  8, 10, 11, 15, 17, 20,
//       21, 27, 31, 33, 37, 40, 45,
//       48, 52, 62, 67, 74, 75
//     ],
//     code: '9241b187f0eb8cb3d5e4ef11fc59d815bb5f99071484df5aeb336345ae183bd6'
// }  
// 
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
    })
}
// 
startSub();