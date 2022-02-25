// 
const { 
    redis_lottery_list,
    redis_lottery_ltrim,
    //
} = require('../tool/redis');
// 
const lottery_list_fix = 'lottery_list_';
const lottery_list_test_fix = 'lottery_list_test_';
// 
const test = async(d) => 
{
    const { category, peroids } = d;
    const _l = lottery_list_fix+''+category;
    // 
    let _list = await redis_lottery_list(_l, 0, 10);
    // 
    // EXTREMELY DANGEROUS ONLY FOR EMERGENCY 
    // await redis_lottery_ltrim(_l, 6, -1);
    //
    console.log(_list);
}
// 
test({
    category: 'jnd',
})
