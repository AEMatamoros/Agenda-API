const helpers = {};

helpers.isAuthenticated = (rep, res, next) =>{
if(rep.isAuthenticated()){
    return next;
}else{
    rep.flash('error_msg','No Autorizado');
    res.redirect('/users/signin');
}
};

module.exports = helpers;