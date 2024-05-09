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
  app.get("/api/mockusers", (req, res) => {
    res.json(mockUsers);
  });
  app.get("/api/paintings", (req, res) => {
    console.log("got all of the paintings");
    db.Painting.findAll({
      order: [["id", "DESC"]],
    }).then(function (result) {
      // console.log(result);
      res.json(result);
    });
  });

  app.post("/api/storePainting", function (req, res) {
    console.log("storepainting");
    db.Painting.create({
      string: req.body.string,
      date: req.body.date,
      users: req.body.users,
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });


  //delete painting
  app
    .delete("/api/deletePainting/:id", function (req, res) {
      db.User.destroy({
        where: {
          id: req.params.id,
        },
      });
    })
    .on("success", function (u) {
      if (u && u.deletedAt) {
        // successfully deleted the project

        console.log(u);
      }
    });
}