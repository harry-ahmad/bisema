const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require("cors");
const db         = require("./app/models");
const app        = express();
const routes     = require("./app/routes");

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});