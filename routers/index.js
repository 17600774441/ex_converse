const express = require("express");
const pool = require("../pool");
var router = express.Router();
router.get("/carousel",(req,res)=>{
  var sql = `SELECT * FROM cv_index_carousel`;
  pool.query(sql,[],(err,result)=>{
    if(err){
      res.send({code:"501",msg:"server err"});
    }else{
      res.send(result);
    }
  });
});
module.exports = router;