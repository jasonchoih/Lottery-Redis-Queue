'use strict';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc'); // dependent on utc plugin
const timezone = require('dayjs/plugin/timezone');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

let _this = dayjs().format('YYYY-MM-DD HH:mm:ss');
console.log(_this);
_this = dayjs(_this).tz("Asia/Shanghai", true).utc().tz("America/Vancouver").format('YYYY-MM-DD HH:mm:ss');
console.log(_this)
