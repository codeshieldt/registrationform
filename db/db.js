const mongoose = require('mongoose');

module.exports = function()
{
    mongoose.connect('mongodb://localhost:27017/Registration')
        .then(() => {console.log('Connected to MongoDB...')})
        .catch((ex) => {console.log(ex)});
}