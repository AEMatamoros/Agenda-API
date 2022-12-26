const express = require('express') //Funcion que devuelve un objeto para uso del framework
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
//Initializations
const app = express()
// require('./database')
require('./src/config/passport')
//Settings
app.set('port', process.env.PORT || 3000) //Asigna el puerto de escucha
app.set('views', path.join(__dirname, 'views')) //Le brinda la direccion de la carpeta views a node
/*aqui se configura el motor que se utilizara para las vistas,asi como sus directorios*/
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  }),
)
app.set('view engine', '.hbs')
//Middlewares
app.use(express.urlencoded({ extended: false })) //codifica url
app.use(methodOverride('_method'))
/*configuracion de variables de sesion permiten autentificar a el usuario*/

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//Global Variables
app.use((rep, res, next) => {
  res.locals.succes_msg = rep.flash('succes_msg')
  res.locals.error_msg = rep.flash('error_msg')
  res.locals.error = rep.flash('error')
  res.locals.user = rep.user || null

  next()
})
//Routes
app.use(require('./src/routes/index'))
app.use(require('./src/routes/agenda'))
app.use(require('./src/routes/users'))
//Static Files
app.use(express.static(path.join(__dirname, 'public')))
//Server iniciation
//Veririca su el servidor esta activo y muestra un mensaje con el puerto de escucha
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
})
