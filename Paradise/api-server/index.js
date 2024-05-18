// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

const { createProxyMiddleware } = require("http-proxy-middleware");

const compression = require("compression");
var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
app.use(history());

app.use(express.static(path.join(__dirname, "../dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/paradise/browser/index.html"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
var db = require("./models");
var session = require("express-session");
const { create } = require("domain");
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Routes
// =============================================================
require("./routes/api-routes")(app);
var PORT = process.env.PORT || 8081;
const server = require("http").createServer(app);
var db = require("./models");

var users = [];

function randomColorBasedOnColor(color) {
  // console.log(color);
  //turn the color into rgb values
  let colorRGB = color.match(/\d+/g);
  //create a new color based on the color passed in plus or minis 50 if number is negative, number is 0
  let random = Math.floor(Math.random() * 100) - 50;
  let random2 = Math.floor(Math.random() * 100) - 50;
  let random3 = Math.floor(Math.random() * 100) - 50;
  let newRed = parseInt(colorRGB[0]) + random;
  let newGreen = parseInt(colorRGB[1]) + random2;
  let newBlue = parseInt(colorRGB[2]) + random3;
  //check if the new color is within the rgb range
  if (newRed > 255) {
    newRed = 255;
  }
  if (newRed < 0) {
    newRed = 0;
  }
  if (newGreen > 255) {
    newGreen = 255;
  }
  if (newGreen < 0) {
    newGreen = 0;
  }
  if (newBlue > 255) {
    newBlue = 255;
  }
  if (newBlue < 0) {
    newBlue = 0;
  }
  //return a random color
  return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}

function createNewUser(user, id) {
  let newFingerColors = [];
  let newButtonStates = [];
  for (let i = 0; i < 27; i++) {
    newFingerColors.push(randomColorBasedOnColor(user.color));
  }

  for (let i = 0; i < 9; i++) {
    newButtonStates.push(false);
  }
  let newUser = {
    name: user.name,
    buttonStates: newButtonStates,
    color: user.color,
    fingerColors: newFingerColors,
    socketid: id,
  };

  users.push(newUser);
}

function getRandomColor() {
  //create a function that generates a random number
  let random = Math.floor(Math.random() * 255);
  let random2 = Math.floor(Math.random() * 255);
  let random3 = Math.floor(Math.random() * 255);
  //return a random color
  return `rgb(${random}, ${random2}, ${random3})`;
}

//create a function that generates a splash item every ,5 seconds and give it the random color attribute and random size
function generateSplash() {
  //get height of the screen
  //create a function that generates a random number
  // let random = Math.floor(Math.random() * 100 + 20);
  let randomHeight = Math.floor(Math.random() * 80) + 20;
  let randomColor = getRandomColor();
  let randomSize = Math.floor(Math.random() * 100) + 20;
  let randomSpeed = Math.floor(Math.random() * 10) + 1;
  return {
    height: randomHeight,
    color: randomColor,
    size: randomSize,
    speed: randomSpeed,
  };
}

//use the server to run both mysql and socket.io

var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    // methods: ["GET", "POST"],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  //when a user connects, add them to the array
  socket.on("savePainting", () => {
    console.log("savePainting");
    io.emit("paintingSaved");
  });
  socket.on("joinGame", (data) => {
    console.log("joingame", data);
    if (users.find((user) => user.name === data.username)) {
      //set it back to the ip that sent the message
      socket.emit("error", "Username already exists");
    } else {
      socket.emit("gameJoined"); //add the user to the array
    }
  });
  socket.on("gameStart", (data) => {
    // console.log("gamestart", data);
    console.log("socket.id", socket.id);
    createNewUser(data, socket.id);
    io.emit("gameStart", users); //add the user to the array
  });
  socket.on("keyPressed", (data) => {
    // console.log("keyPressed", data);
    io.emit("changeHtml", data);
  });
  socket.on("disconnect", () => {
    console.log("disconnect socket", socket.id);
    //remove the user from the array
    users = users.filter((user) => user.socketid !== socket.id);
    io.emit("updateUsers", users);
  });

  //setinterval that sends the result of a generatesplath over to all users
});

setInterval(() => {
  io.emit("generateSplash", generateSplash());
}, 1500);

db.sequelize.sync().then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});

// db.sequelize.sync().then(function() {
//   server.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);

//   });
// });
