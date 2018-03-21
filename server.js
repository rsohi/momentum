const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");


const index = require("./routes/index");
const employees = require("./routes/employees");

const app = express();

let port = 3000;

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

//routes
app.use("/", index);
app.use("/api", employees);

app.listen(port, () => {
  console.log("SERVER Started on port "+port);
})
