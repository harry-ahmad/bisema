const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
    let email = req.params.email;
    let password = req.params.password;
    Users.findAll({ where: { email: email,password: password } })
    .then(data => {
      res.send(data[0]);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User."
      });
    });
};