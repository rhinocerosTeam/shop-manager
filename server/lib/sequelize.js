/**
 * @Author: user
 * @Date:2018/11/7
 * @Last Modified time: 2018/11/7
 * @Description: sequelize
 * @Remark:
 - 备注一
 */

var config = require('../config/default.js')

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database.DATABASE, config.database.USERNAME, config.database.PASSWORD, {
  host: config.database.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

export default sequelize
