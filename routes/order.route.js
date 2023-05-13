const express = require("express");
const orderController = require("../controllers/order.controller");
const orderValidator = require("../validators/order.validator");
const OrderModel = require("../models/order.model");

const router = express.Router();

// Create new order
router.post("/",
    orderValidator.create,
    orderController.create
);

// Update new order 
router.post("/update",
    orderValidator.update,
    orderController.update
);

// Get orders for a specific date
router.get("/list/:date",
    orderValidator.list,
    orderController.list
);

// Delete order with order id
router.delete("/delete/:order_id",
    orderValidator.orderId,
    orderController.delete
);

router.get("/search/:order_id",
    orderValidator.orderId,
    orderController.search
);

module.exports = router;
