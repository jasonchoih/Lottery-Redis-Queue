
//
const { redis_sd28_pub, redis_lottery_get, redis_lottery_set } = require('./tool/redis');
// 
const test = async() =>
{
    const LotteryNewCaomei = await redis_lottery_get('lottery_caomei_new_data');
    console.log(LotteryNewCaomei);
};
test();