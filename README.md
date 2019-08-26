# nik-react-app
React, MongoDB, Bootstrap, Sass, NodeJS, JWT.

<a href="">Watch Video</a> | <a href="https://hmsrtc.herokuapp.com/">View Live</a>

<h2>For Client-Side</h2>
<ul>
<li>npm install</li>
<li>npm start</li>
<li>if its ask for different port in cmd window say 'yes'</li>
</ul>

<h2>For Server-Side</h2>
<ul>
<li>npm install</li>
<li>node app</li>
</ul>

<h2>Production</h2>
<h3>For Client-Side</h2>
<ul>
<li>go to data folder and edit file app.config.js
  <pre>
  "api":{
        "base": "{YOUR SERVER DOMAIN}/api",
  </pre>
</li>
<li>npm run build</li>
<li>copy "build" folder to root folder in "server side"</li>
</ul>

<h3>For Server-Side</h2>
<ul>
<li>edit app.js and replace all content with:
  <pre>

  
 
require("./config/config");
require("./models/db");
require("./config/passportConfig");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path")

const rtsIndex = require("./routes/index.router");

var app = express();

// middleware
app.use(bodyParser.json());
// app.use(cors());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "build")));
app.enable('trust proxy');
app.use(function(req, res, next) {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    res.redirect(`https://${req.hostname}`);
  }
});

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use("/api", rtsIndex);
app.use((req,res)=>{
    res.send("404, not found");
});

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach(key =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  } else {
    console.log(err);
  }
});

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);






  </pre>
</li>
<li>deploy to server</li>
</ul>
