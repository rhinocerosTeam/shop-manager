/**
 * Created by songpeilan on 2018/6/19.
 */
var router=require('koa-router')();
import ParamsUtils from '../utils/params'
 import {userCtrl} from '../controls/user'

// GET '/signup' 注册页

router.get('/addUser',async (ctx,next)=>{

   let {name,password} = ParamsUtils.queryValidate(ctx)||{}
   let data = await userCtrl.addUser([name,password])
  //
   ctx.body = { code: 200, data: data, msg: '' }
  //let a='es6'
  //ctx.body = { code: 200, data: `${a} yes`, msg: '' }

  // await ctx.render('signup',{
  //   session:ctx.session,
  // })
})

module.exports=router
