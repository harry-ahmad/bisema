const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require("cors");
const db         = require("./app/models");
const app        = express();
const routes     = require("./app/routes");
const fs         = require('fs');
const path       = require('path');
var corsOptions  = {
  origin: "*"
};

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/api',routes);


app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/assets', express.static(__dirname + '/assets'));
// simple route
app.get("/", (req, res) => {
  const dirs = path.join(__dirname, '/assets');
    const f = fs.readdirSync(dirs, {withFileTypes: true})
    .filter(item => item.isDirectory());
    res.json({ message: f });
});
app.get("/:code", (req, res) => {
  const dirs = path.join(__dirname, `/assets/${req.params.code}`);
    const f = fs.readdirSync(dirs, {withFileTypes: true})
    .filter(item => item.isDirectory());
    res.json({ message: f });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});