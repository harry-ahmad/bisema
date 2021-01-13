const express           = require('express');
const router            = express.Router();
const orderController   = require("../controllers/order.controller");
const userController   = require("../controllers/user.controller");

router.post("/create",orderController.create);
router.get("/login/:email/:password",userController.login);

module.exports = router;