const mongoose= require('mongoose');
const {Schema}= mongoose;
const bcrypt= require('bcryptjs');
const UserSchema=new Schema({
    Nombre:{type:String, required:true},
    Correo:{type:String, required:true},
    Password:{type:String, required:true},
    FechaC:{type:Date,default:Date.now}
});

UserSchema.methods.encryptPassword = async (Password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(Password,salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (Password){
    return await bcrypt.compare(Password,this.Password);
}
module.exports= mongoose.model('user',UserSchema);