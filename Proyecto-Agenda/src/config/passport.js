
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/users'); 

passport.use(new LocalStrategy({
  usernameField: 'Correo',
  passwordField: 'Password'
}, async (Correo, Password, done) => {
  // Match Email's User
  const user = await User.findOne({Correo: Correo});
  if (!user) {
    return done(null, false, { message: 'No registrado' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(Password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  }

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});