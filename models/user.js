const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


//Create User Schema
const UserSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});

const User = module.exports = mongoose.model("User", UserSchema);

//Function Exposed of User
module.exports.getUserByID = (id,callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username,callback) => {
    let query = {username}
    User.findOne(query, callback);
}

module.exports.addUser = (newuser,callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
            if(err) {
                throw err;
            } else {
                newuser.password = hash;
                newuser.save(callback);
            }
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
   bcrypt.compare(candidatePassword,hash, (err, isMatch) => {
       if(err) {
           throw err;
       } else {
           callback(null, isMatch);
       }
   });
}