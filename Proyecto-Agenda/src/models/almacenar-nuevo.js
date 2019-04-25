const mongoose= require('mongoose');
const {Schema}= mongoose;
const AgendaSchema=new Schema({
    Nombre:{type:String, required:true},
    Direccion:{type:String, required:true},
    TDireccion:{type:String, required:true},
    Telefono:{type:String, required:true},
    Correo:{type:String, required:true},
    TRed:{type:String, required:true},
    Ocupacion:{type:String, required:true},
    Identidad:{type:String, required:true},
    FechaN:{type:String, required:true},
    Descripcion:{type:String, required:true},
    FechaC:{type:Date,default:Date.now},
    user:{type:String}}
);

module.exports= mongoose.model('Agenda',AgendaSchema);