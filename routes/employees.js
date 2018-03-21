const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

let db = mongojs("mongodb://chandnivirde:chandnivirde@ds119059.mlab.com:19059/momentum",["employees"]);

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


module.exports = router;
