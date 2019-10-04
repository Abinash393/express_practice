const mongoose = require('mongoose');

let schema = mongoose.Schema;

let articleSchema = new schema({
    name :{type:String ,unique:true},
    content :{type:String},
});

var User = mongoose.model('article', articleSchema);

module.exports = article;