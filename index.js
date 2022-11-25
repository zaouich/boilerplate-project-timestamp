// index.js
// where your node app starts

// init project
const { Router } = require('express');
var express = require('express');
var app = express();

const checkIfExict= (req,res,next)=>{
  if(!req.params.date){
    return res.status(200).json({
      unix:new Date().getTime(),
      utc:new Date().toUTCString()
    })
  }
  next()
}
const checkDate =(req,res,next)=>{
  const date = new Date(req.params.date)
  if(isNaN(date.getTime())){
    if(!isNaN(new Date(req.params.date *1))) {
        return next()
    } 
    return res.status(400).json({ error : "Invalid Date" })
    
  }
  else{
    return next()
  }
  next()
}
const chekcNumber = (req,res,next)=>{
  if(! isNaN(req.params.date*1)){
    req.params.date=req.params.date*1
  }
  next()
}
const getResult = (req,res)=>{
  return res.status(200).json({
    unix:new Date(req.params.date).getTime(),
    utc:new Date(req.params.date).toUTCString()
  })
} 


const router= Router()
router.route("/:date?").get(checkIfExict,checkDate,chekcNumber, getResult)
router.route("/").get(checkIfExict)
app.use("/api",router)

app.listen(3000,()=>{
  console.log("listing to port..");
})
