// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

const { createProxyMiddleware } = require('http-proxy-middleware');

const passportControl = require('./config/passport');
const compression = require("compression");

var express = require("express");
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(compression())
var db = require("./models");
var session = require("express-session");
app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
  app.use(passportControl.initialize());
  app.use(passportControl.session());
// Routes
// =============================================================
require("./routes/api-routes")(app);

//socket.io
//import socket.io
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("keyPressed", (data) => {
    io.emit("changeHtml", data);
  });
});



var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);

db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    

  
  });
});