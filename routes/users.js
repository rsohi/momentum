const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");


const User = require("../models/user");


//Register Route
router.post("/register", (req, res, next) => {
   let newUser = new User({
       name : req.body.name,
       email : req.body.email,
       username : req.body.username,
       password : req.body.password,
   }); 
   //res.send("Register");

   User.addUser(newUser, (err, user) => {
       if(err) {
           res.json({sucsess : false, msg : "Failed to Register the User"});
       } else {
        res.json({sucsess : true, msg : "Registered"});
       }
   })
});

//Authenticate Route
router.post("/authenticate", (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if(err) {
          throw err;
      } else if(!user) {
          res.json({sucsess:false, msg: "User not found !"});
      } else {
          User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                throw err;
            }
            if(isMatch) {
                const token = jwt.sign(user.toJSON() ,config.secret, {
                   expiresIn : 604800 // 1 week
                });

                res.json({
                    sucsess:true,
                    token: 'JWT '+token,
                    user : {
                        id : user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                });
            } else {
                res.json({sucsess:false, msg: "Wrong Password"})
            }
          })
      }
    })
 });
 
//Profile Route
router.get("/profile", passport.authenticate('jwt', {session:false}),  (req, res, next) => {
    res.json({user:req.user})
 });


//export the ROUTER
module.exports = router;