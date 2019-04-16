const express = require('express');
const router =express.Router();

router.get('/users/signin',(rep,res)=>{
    res.render('users/signin');
    });

 router.get('/users/signup',(rep,res)=>{
    res.render('users/signup');
    });
module.exports=router;