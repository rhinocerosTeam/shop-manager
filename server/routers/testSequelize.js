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

var router=require('koa-router')();
import {testCtrl} from '../controls/testSequelize'
// GET '/signup' 注册页

router.get('/test',async (ctx,next)=>{
  let data = await testCtrl.test()
  ctx.body = { code: 200, data:data, msg: '' }

})
router.get('/test_findOne',async (ctx,next)=>{
  let data = await testCtrl.findOne()
  ctx.body = { code: 200, data:data, msg: '' }

})

module.exports=router


