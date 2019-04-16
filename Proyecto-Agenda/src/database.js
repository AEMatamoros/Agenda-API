const moongose =require('mongoose');

moongose.connect('mongodb://localhost/agenda-db-app',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify: false
})
    .then(db => console.log('La BD esta conectada'))
    .catch(err => console.error(err)); 
