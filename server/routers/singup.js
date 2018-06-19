/**
 * Created by songpeilan on 2018/6/19.
 */
var router=require('koa-router')();

// GET '/signup' 注册页

router.get('/signup',async (ctx,next)=>{
  await ctx.render('signup',{
    session:ctx.session,
  })
})

module.exports=router
