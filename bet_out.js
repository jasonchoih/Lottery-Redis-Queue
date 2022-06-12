// 
const { Sequelize, DataTypes } = require("sequelize");
const express = require('express');
const app = express();
//
const sequelizeSD28 = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'k9=@*SCT?-LbSky7FcrKMmvXu',
    database: 'sd28_com_20210603'
};
const sequelize = new Sequelize(sequelizeSD28.database, sequelizeSD28.username, sequelizeSD28.password, {
    host: sequelizeSD28.host,
    dialect: 'mysql',
    logging: null,                        // 禁用日志记录
    // benchmark: true, // 显示语句执行时间
    // logging: (...args) => 
    // {
    //     console.log('----------------------------------------------------------------');
    //     console.log(`${args[1]}ms`);
    //     console.log(`${args[0].replace('Executed (default): ','')}`);
    //     //
    //     if(args[2] && args[2].bind)
    //     {
    //         console.log(args[2].bind);
    //     }
    // },
    // timezone: '+08:00', //for writing to database
    //
    define: {
        underscored: true,
        timestamps: false,
        freezeTableName: true
    }
});
const USERBET = sequelize.define('user_bet', 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    category: {
        type: DataTypes.STRING(10),
        comment: '游戏分类'
    },
    type: {
        type: DataTypes.STRING(10),
        comment: '游戏类型'
    },
    peroids: {
        type: DataTypes.STRING(15),
        comment: '期数'
    },
    num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '投注数量'
    },
    dou: {
        type: DataTypes.DECIMAL(15, 0),
        allowNull: false,
        comment: '合计金豆'
    },
    win_dou: {
        type: DataTypes.DECIMAL(15, 0),
        defaultValue: 0,
        comment: '中奖金豆'
    },
    wins: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '中奖号码'
    },
    vals: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: '投注号码'
    },
    ls: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        comment: '是否流水 1是 2否'
    },
    mode: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        comment: '模式 1手动 2自动'
    },
    status: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
        comment: '类型 1投注中 2已开奖'
    },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '最后投注时间'
    }
});
//
const aTob = async(a,b) =>
{
    if(!b) return a;
    let n = a;
    //
    for(let i in b)
    {
        if(n[i])
        {
            n[i] = parseInt(a[i]) + parseInt(b[i]);
        }else{
            n[i] = b[i];
        }
    }
    //
    return n;
}
//
const getBetData = async(category, peroids) => 
{
    const _bet_data = await USERBET.findAll({
        attributes: ['type','vals'],
        where: {
            category,
            peroids
        }
    });
    if(!_bet_data) return '';
    // 
    let data = {};
    for(let i in _bet_data)
    {
        const _bi = _bet_data[i];
        // console.log(_bi['type'], _bi['vals']);
        data[_bi['type']] = await aTob(JSON.parse(_bi['vals']), data[_bi['type']]);
    }
    return data;
}
// 
app.get('/', async(req, res) =>
{
    const { category, peroids } = req.query;
    // console.log(category, peroids);
    // 
    if(!category || !peroids) return res.json({});
    // 
    let _bets = '';
    try {
        _bets = await getBetData(category, peroids);
    } catch (error) {
        
    }
    //
    if(!_bets) return res.json({});
    // 
    res.json(_bets);
})
//
app.listen(7777);