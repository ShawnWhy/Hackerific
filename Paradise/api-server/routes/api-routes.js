// Requiring our models
var db = require("../models");
var connection = require("./connection");

const mockUsers = {
  "jim@joesrobotshop.com": {
    firstName: "Jim",
    lastName: "Cooper",
    email: "jim@joesrobotshop.com",
    password: "very-secret",
  },
  "joe@joesrobotshop.com": {
    firstName: "Joe",
    lastName: "Eames",
    email: "joe@joesrobotshop.com",
    password: "super-secret",
  },
};

module.exports = function (app) {

app.get("/api/mockusers",(req,res)=>{
  res.json(mockUsers);
})
app.get("/api/paintings",(req, res)=>{
  console.log("got all of the paintings")
  db.Painting.findAll({
    order: [
          ["id", "DESC"],
    ],
  }).then(function (result) {
      console.log(result);
      res.json(result);
    });
})
}