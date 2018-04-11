const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database");



//Connections to DB
mongoose.connect(config.database);

let db = mongoose.connection;

//On Connection
db.on("connected", () => {
  console.log("Connected to the DataBase");
});

//On Error
db.on("error", (err) => {
  console.log("Database error -------------->"+err);
});




const index = require("./routes/index");
const employees = require("./routes/employees");
const users = require("./routes/users");

const app = express();

let port = 3000;

//CORS middleware 
app.use(cors());

//View Engine
app.set("views", path.join(__dirname, "client/dist"));
app.set("view engine","ejs");
app.engine("html", require("ejs").renderFile);

//Set Static, Angular folder
app.use(express.static(path.join(__dirname, "client/dist")));

//Middle Ware BODY parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : false
}));


//Middleware Passport
app.use(passport.initialize());
app.use(passport.session());

let passportJWT = require("./config/passport");
passportJWT(passport);

//routes
app.use("/", index);
app.use("/api", employees);
app.use("/users", users);

//Start Server
app.listen(port, () => {
  console.log("SERVER Started on port "+port);
})
