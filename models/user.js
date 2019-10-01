const mongoose = require('mongoose');

let schema = mongoose.Schema;

let userSchema = new schema({
    name :{type:String},
    email :{type:String, unique:true},
    age : {type:Number, age:18}
});

var User = mongoose.model('User', userSchema);

module.exports = User;