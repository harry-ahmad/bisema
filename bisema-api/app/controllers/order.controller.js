const db = require("../models");
const Orders = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
    let body  = req.body;
    let order = {
        product_code : null,
        image        : null,
        description  : null,
        price        : null,
        qty          : null,
        total_amount : null,
        catalog_code : null,
        user_id      : null
    } 
    body.forEach(element => {
        order.product_code = element.productCode;
        order.image        = element.image;
        order.description  = element.description;
        order.price        = element.price;
        order.qty          = element.qty;
        order.total_amount = element.total_amount;
        order.catalog_code = element.catalog_code;
        order.user_id      = element.user_id;
        Orders.create(order)
        .then(data => {
            res.status(200).send({message:"save sauccessfully"});
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Order."
            });
        });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all Orders
exports.findAllPublished = (req, res) => {
  
};