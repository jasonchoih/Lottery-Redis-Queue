const request = require('request-promise');
const { redis_us_subs, redis_lottery_lpush, redis_lottery_lrange } = require('./tool/redis');
//
const get = async(uri) => 
{
    try {
        const _data = await request({
            method: 'get', 
            json: true,  
            uri,
            timeout: 4000
        });
        // console.log(_data);
        //
        if(_data) return _data;
        //
    } catch (error) {
        
    }
    return false;
}
//
const test = async() =>
{
    const _list = await get('http://170.106.15.145:3692/jnd_list');
    // console.log(_list);
    if(!_list) return;
    //
    let _peroid = '2773166';
    //
    let _this = {};
    //
    for(let i in _list)
    {
        let _li = _list[i];
        if(i==_peroid)
        {
            _this = {
                category: 'jnd',
                peroids: parseInt(i),
                time: _li[0],
                number: _li[1]
            }
        }
    }
    //
    // if(_this) await redis_lottery_lpush('lottery_open_list', JSON.stringify(_this));
    //
    console.log(_this);
};
test();