const express = require('express');
const router =express.Router();

const user=require('../models/users');
router.get('/users/signin',(rep,res)=>{
    res.render('users/signin');
    });

 router.get('/users/signup',(rep,res)=>{
    res.render('users/signup');
    });

router.post('/users/signup',async (rep,res)=>{
    const {Nombre,Correo,Password,PasswordC}=rep.body; 
    const errors=[];
    //Comprobcion de errores
    if(Nombre.length<1){
        errors.push({text:'Debe ingresar un nombre'});
    }
    if(Correo.length<1){
        errors.push({text:'Debe ingresar un correo'});
    }
    if(Password.length<1){
        errors.push({text:'Debe ingresar una contraseña'});
    }
    if(PasswordC.length<1){
        errors.push({text:'Debe ingresar una confirmacion de contrseña'});
    }

    

    if(Password!=PasswordC){
        errors.push({text:'Las contraseñas no son iguales'});
    }
    //res.send('ok');
    if(Password.length<5){
        errors.push({text:'La contraseña debe tener al menos 5 digitos'});
    }
    if(errors.length>0){
        res.render('users/signup', {errors,Nombre,Correo,Password,PasswordC})
    }else{
        //res.send('ok');
        const Correocom= await user.findOne({Correo: Correo});
    if(Correocom){
            errors.push({text:'EL correo ya existe'});
            res.render('users/signup', {errors,Nombre,Correo,Password,PasswordC})
    }else{
        const newUser=new user({Nombre,Correo,Password});
            newUser.Password=await newUser.encryptPassword(Password);
            await newUser.save();
            res.redirect('/users/signin');
    }
            
       
    };
    
     });
module.exports=router;