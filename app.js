//基本模块引入
const express = require( 'express' );
const bodyParser = require( 'body-parser' ); //POST
const userRouter = require('./routers/user.js');//用户路由
const indexRouter = require("./routers/index.js");
//创建服务器
const app = express();
app.listen(5050,()=>{ console.log('Start service success') });
app.disable('x-powered-by');
app.use( bodyParser.urlencoded({extended:false}));
//将静态文件托管到public目录中
app.use(express.static('public') );
//引用路由器
app.get('/',(req,res)=>{
  res.redirect('/index.html');
});
app.use('/user',userRouter);
app.use("/index",indexRouter);