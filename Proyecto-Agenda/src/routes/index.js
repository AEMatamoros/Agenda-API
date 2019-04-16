const express = require('express');
const router =express.Router();

router.get('/',(rep,res)=>{
res.render('index');
});

router.get('/about',(rep,res)=>{
    res.render('about');
    });

module.exports=router;