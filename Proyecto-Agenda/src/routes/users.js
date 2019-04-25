const router = require('express').Router();
const User=require('../models/users');
const passport = require('passport');

router.get('/users/signin',(rep,res)=>{
    res.render('users/signin');
});
/*
router.post('/users/signin',(rep,res)=>{
    const {Correo,Password}=rep.body;
    console.log(Correo);
    console.log(Password);
    res.render('agenda/show-add');
});*/

router.post('/users/signin',passport.authenticate('local',{
    successRedirect: '/agenda',
    failureRedirect: '/users/signin',
    failureFlash: true
}));


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
        const Correocom= await User.findOne({Correo: Correo});
    if(Correocom){
            errors.push({text:'EL correo ya existe'});
            res.render('users/signup', {errors,Nombre,Correo,Password,PasswordC})
    }else{
        const newUser=new User({Nombre,Correo,Password});
           newUser.Password=await newUser.encryptPassword(Password);
            await newUser.save();
            rep.flash('succes_msg','Registrado Satisfactoriamente');
            res.redirect('/users/signin');
    }
            
       
    };
    
});
router.get('/users/logout',(rep,res)=>{
    rep.logOut();
    res.redirect('/');
});
module.exports=router;