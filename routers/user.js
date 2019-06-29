const express = require('express');
const pool = require('../pool.js');
var router = express.Router();
//注册路由
router.post('/reg',(req,res)=>{
  var obj = req.body,i = 400;
  for (var key in obj){
    i++;
    if (!obj[key]){
      res.send({code:i,msg:key + ' required'});
      return;
    }
  }
  //执行SQL
  pool.query('INSERT INTO cv_user SET ?',[obj],(err,result)=>{
    //判断手机号码是否注册过(phone列唯一约束,返回错误)
    //code: 'ER_DUP_ENTRY',
    //errno: 1062,
    if(err){
      if (err.code === "ER_DUP_ENTRY"){
        res.send({code:301,msg:'phone required'});
      }
    }else{
      if (result.affectedRows > 0){
        res.send({code:200,msg:'reg success'});
      }else{
        res.send({code:301,msg:'reg error'});
    }
    };
  });
});

//登录路由
router.post('/login',(req,res)=>{
  var obj = req.body;
  if (!obj.logName){
    res.send({code:401,msg:'userName requierd'})
    return;
  }
  if (!obj.upwd){
    res.send({code:402,msg:'upwd required'});
    return;
  }
  pool.query('SELECT * FROM cv_user WHERE (phone=? OR email=?) AND upwd=?',[obj.logName,obj.logName,obj.upwd],(err,result)=>{
    if (err){
      res.send({code:401,msg:'unknown error'});
    }else{
      if (result.length > 0){
        res.send({code:200,msg:'login success'});
      }else{
        res.send({code:301,msg:'login error'});
      }
    }
  });
});
//用户检索
router.get('/detail',(req,res)=>{
  var obj = req.query;
  if (!obj.uid){
    res.send({code:401,msg:'uid required'});
    return;
  }
  pool.query('SELECT * FROM cv_user WHERE uid=?',[obj.uid],(err,result)=>{
    //if(err) console.log(err);
    if (result.length>0){
      res.send(result);
    }else{
      res.send({code:301,msg:'no userdata'});
    }
   
  });
});

//删除用户
router.get('/delete',(req,res)=>{
  var obj = req.query;
  if (!obj.uid){
    res.send({code:401,msg:'uid required'});
    return;
  }
  //console.log(obj);
  pool.query("DELETE FROM cv_user WHERE uid = ?",[obj.uid],(err,result)=>{
    if(err){
      res.send({code:301,msg:'delete error'});
      //console.log(err);
      return;
    }
    //console.log(result);
    if (result.affectedRows > 0){
      res.send({code:200,msg:'delete success'});
    }else{
      res.send({code:301,msg:'delete error'});
    }
  });

});
//修改用户信息
//| uid | upwd| email | phone | birthday | avatar | user_name | gender |
router.post('/update',(req,res)=>{
  var obj = req.body;
  var i = 400;
  for (var key in  obj){
    i++;
    if (!obj[key]){
      res.send({code:i,msg:key + ' required'});
      return;
    }  
  }
  pool.query('UPDATE cv_user SET upwd=?,birthday=?,user_name=?,gender=? WHERE uid=?',[obj.upwd,obj.birthday,obj.user_name,obj.gender,obj.uid],(err,result)=>{
    if (err){
      res.send({code:302,msg:'update error'});
      return;
    }
    if(result.affectedRows > 0){
      res.send({code:200,msg:'update success'});
    }else{
      res.send({code:301,msg:'update error'});
    }
  });
});

//用户列表
router.get('/list',(req,res)=>{
  var obj = req.query;
  obj.pNum = !obj.pNum ? 1:parseInt(obj.pNum);
  obj.pSize = !obj.pSize ? 5:parseInt(obj.pSize);
  var start = (obj.pNum - 1) * obj.pSize;
  var userCount;
  pool.query('SELECT COUNT(phone) FROM cv_user',(er,res)=>{
      userCount = res[0]['COUNT(phone)'];   
  });
  pool.query('SELECT * FROM cv_user LIMIT ?,?',[start,obj.pSize],(err,result)=>{
    //console.log(userCount);
    if(err){
      res.send({code:401,msg:'unKonw error'});
      return;
    }
    if(result.length>0){
      res.send({"recordCount":userCount,"pageSize":obj.pSize,"pageCount":Math.ceil(userCount/obj.pSize),"data":result});
    }else{
      res.send({code:301,msg:'no data'});
    }
  });
});



module.exports = router;