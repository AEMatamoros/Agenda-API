const express=require('express');//Funcion que devuelve un objeto para uso del framework
const path= require('path');
const exphbs =require('express-handlebars');
const methodOverride= require('method-override');
const session =require('express-session');
//Initializations
const app= express();
require('./database');
//Settings
app.set('port', process.env.PORT ||3000)//Asigna el puerto de escucha
app.set('views',path.join(__dirname,'views'))//Le brinda la direccion de la carpeta views a node
    /*aqui se configura el motor que se utilizara para las vistas,asi como sus directorios*/
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');
//Middlewares
app.use(express.urlencoded({extended:false}));//codifica url
app.use(methodOverride('_method'));
    /*configuracion de variables de sesion permiten autentificar a el usuario*/ 
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
//Global Variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/agenda'));
app.use(require('./routes/users'));
//Static Files
app.use(express.static(path.join(__dirname,'public')));
//Server iniciation
//Veririca su el servidor esta activo y muestra un mensaje con el puerto de escucha
app.listen(app.get('port'),()=> {
    console.log('Server on port ',app.get('port'));
})