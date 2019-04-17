const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/photobomb', {
  useNewUrlParser: true
});

const users = require("./users.js");
app.use("/api/users", users.routes);

const comments = require("./entries.js");
app.use("/api/entries", comments.routes);

app.listen(3030, () => console.log('Server listening on port 3030!'));