const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

let db = mongojs("mongodb://chandnivirde:chandnivirde@ds119059.mlab.com:19059/momentum",["employees", "testdata"]);

router.get("/employees", (req,res,next) => {
  //res.render("index.html");
  db.employees.find((err,employees) => {
    if(err){
      res.send(err);
    } else {
      res.json(employees);
    }
  });
});

router.get("/testdata", (req,res,next) => {
  //res.render("index.html");
  db.testdata.find((err,testdata) => {
    if(err){
      res.send(err);
    } else {
      res.json(testdata);
    }
  });
});


module.exports = router;
