const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://1998sangeetasharma:sangeeta123@cluster0-hczzk.mongodb.net/blog',{
    useNewUrlParser: true,
})

var db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDB connection error'));

db.once('open',() => {
    console.log('Database Connected');
});