/**
 * @Author: user
 * @Date:2018/11/7
 * @Last Modified time: 2018/11/7
 * @Description: 描述
 * @Query: 页面参数
 * @Props: 组件参数
 * @Remark:
 - 备注一
 */
const Sequelize = require('sequelize');

import sequelize from '../lib/sequelize.js'

const Users = sequelize.define('users', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
},{
  timestamps: false,
});



export default class  Test{

  async test(){
    console.log("111")
    let data = await Users.findAll()
    return data
  }

  async findOne(){
    let data = await Users.findOne({
      where:{name:'123'},
      attributes: ['id', ['password','name']]
    })
    return data
  }

}

export const testCtrl = new Test()
