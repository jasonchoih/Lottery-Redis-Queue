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
    redis_lottery_linsert,
    redis_lottery_setex,
    redis_lottery_lrange,
    redis_lottery_rpop,
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
    const _lt = lottery_list_test_fix+''+category;
    // 
    let _list = await redis_lottery_list(_l, 0, -1);
    // 
    // 
    // for(let i=50;i>0;i--)
    // {
    //     await redis_lottery_lpush(_lt, JSON.stringify(_list[i]));
    // }
    // BEFORE
    // await redis_lottery_ltrim(_lt, 2, 1);
    let _list_t = await redis_lottery_list(_lt, 0, -1);
    const _old_index_find = _list_t.find(v=>peroids > v.peroids);
    const _abc = await redis_lottery_linsert(_lt, 'BEFORE', JSON.stringify(_old_index_find), JSON.stringify({abc1:'abc1'}));
    console.log(_abc);
    // console.log(_abc);
    _list_t = await redis_lottery_list(_lt, 0, -1);
    //
    console.log(JSON.stringify(_list_t));
    // 
    // let _index = '';
    // for(let i in _list)
    // {
    //     // _index = _list.find(v=>peroids > v.peroids);
    //     _index = _list.findIndex(v=>peroids > v.peroids);
    // }
    // if(_index) 
    // console.log(_index);
    // 
    // console.log(_list);
}
// 
test({
    category: 'ddbj',
    peroids: '111001265'
})