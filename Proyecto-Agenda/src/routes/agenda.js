const express = require('express');
const router =express.Router();
const Agenda=require('../models/almacenar-nuevo')//Esta constante me permite trabajar con el esquema ya sea update ,insert o delete
const {isAuthenticated}=require('../helpers/ax');

router.get('/agenda/add',(rep,res)=>{
    res.render('agenda/new-add');
});
/*
router.get('/agenda',(rep,res)=>{
    res.send('Agenda en la bd');
});*/
//Obtener la infomacion enviada por el formulario de forma asincrona
router.post('/agenda/new-add',async (rep,res)=>{
   const {Nombre,Direccion,TDireccion,Telefono,Correo,TRed,Ocupacion,Identidad,FechaN,Descripcion}=rep.body;
   const errors =[];
   //---
   const NombreDup= await Agenda.findOne({Nombre: Nombre,user: rep.user.id});
   if(NombreDup){
       errors.push({text:"Ya hay una entrada con este nombre en la agenda"});
       };
   //---
   //No permitir informacion nula o vacia
   if(!Nombre){
       errors.push({text:"Ingrese un nombre valido"});
   }
   if(!Direccion){
    errors.push({text:"Ingrese una direccion valida"});
    }
    if(!TDireccion){
        errors.push({text:"Ingrese un tipo de direccion valido"});
    }
    if(!Correo){
        errors.push({text:"Ingrese un Correo valido"});
    }
    if(!TRed){
        errors.push({text:"Ingrese un tipo de red valido"});
    }
    if(!Telefono){
        errors.push({text:"Ingrese un Telefono valido"});
    }
     if(!Ocupacion){
         errors.push({text:"Ingrese una ocupacion valida"});
    }
     if(!Identidad){
        errors.push({text:"Ingrese una identidad valida"});
    }
    if(!FechaN){
        errors.push({text:"Ingrese una fecha de nacimiento valida"});
    }/*
    if(Descripcion){
        errors.push({text:"Ingrese una descripcion valida"});
    }*/
    if(errors.length>0){
        res.render('agenda/new-add',{
            errors,
            Nombre,
            Direccion,
            TDireccion,
            Telefono,
            Correo,
            TRed,
            Ocupacion,
            Identidad,
            FechaN,
            Descripcion
        });
        }else {
             //res.send('ok');//se muestra si la infomacion se envio correctamente()
            const newAgenda= new Agenda({Nombre,
                Direccion,
                TDireccion,
                Telefono,
                Correo,
                TRed,
                Ocupacion,
                Identidad,
                FechaN,
                Descripcion});
                console.log(newAgenda);
            newAgenda.user=rep.user.id;
                console.log(newAgenda.user);
                
                await newAgenda.save();
                res.redirect('/Agenda');
        }

   //console.log(rep.body)//Permite ver la infomacion enviada en la consola del node
});

router.get('/agenda',async (rep,res)=>{
    const agendas= await Agenda.find({user: rep.user.id}).sort({FechaC:'desc'});
    res.render('agenda/show-add',{agendas});
    //Agenda.find(Nombre:"Hyperion");//PAra filtrar informacion de la bd
});

router.get('/agenda/edit/:id',async (rep,res)=>{
    const param= await Agenda.findById(rep.params.id);
    res.render('agenda/edit',{param});
    //Agenda.find(Nombre:"Hyperion");//PAra filtrar informacion de la bd
});

router.put('/agenda/edit/:id',async (rep,res)=>{
    const {Nombre,
        Direccion,
        TDireccion,
        Telefono,
        Correo,
        TRed,
        Ocupacion,
        Identidad,
        FechaN,
        Descripcion}=rep.body;
    
    await Agenda.findByIdAndUpdate(rep.params.id,{Nombre,
        Direccion,
        TDireccion,
        Telefono,
        Correo,
        TRed,
        Ocupacion,
        Identidad,
        FechaN,
        Descripcion});
        rep.flash('succes_msg', 'Registro editado de forma exitosa');
        res.redirect('/agenda');
    });

router.delete('/agenda/delete/:id',async (rep,res)=>{
    /*console.log(rep.params.id);
    res.send('ok');*/
    await Agenda.findByIdAndDelete(rep.params.id);
    rep.flash('succes_msg', 'Eliminado de forma exitosa');
    res.redirect('/agenda');
});
module.exports=router;