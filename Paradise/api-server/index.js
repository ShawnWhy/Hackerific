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
// require("./routes/api-routes")(app);
var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);

//socket.io
//import socket.io

var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    // methods: ["GET", "POST"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("keyPressed", (data) => {
    io.emit("changeHtml", data);
  });
});

io.on("connection", (socket) => {
  socket.emit("news", { hello: "world" });

  socket.on("my other event", (data) => {
    console.log(data);
    //emit an event to all connected clients including sender
    socket.emit("news2", { hello: "world2" });
});
// setInterval(() => {
//   socket.emit("news", { hello: "world" });
// }, 200);
});



  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


// db.sequelize.sync().then(function() {
//   server.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
    

  
//   });
// });