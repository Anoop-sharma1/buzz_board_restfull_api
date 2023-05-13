const OrderModel = require("../models/order.model");

const DiplicateId = 11000;

const create = (async (req, res) => {
    try {

        const newOrder = await OrderModel.create(req.body);

        return res.status(200).json({
            status: true,
            message: "New order created successfully!",
            data: newOrder
        });

    } catch (error) {

        if (error.code === DiplicateId) {
            return res.status(404).json({
                status: false,
                message: "Duplicate order_id",
                data: {}
            });
        }

        return res.status(404).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const list = (async (req, res) => {

    const date = req.params.date;

    try {

        const orders = await OrderModel.aggregate([
            {
                $match: {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$order_date" },
                            regex: date
                        }
                    }
                }
            }
        ]).exec();

        if (orders.length <= 0) {
            return res.status(404).json({
                status: false,
                message: "No orders found!",
                data: orders
            });
        }

        return res.status(200).json({
            status: true,
            message: "Orders retrieved successfully!",
            data: orders
        });

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const search = (async (req, res) => {

    const order_id = req.params.order_id;

    try {

        const order = await OrderModel.findOne({ order_id: order_id });

        if (!order) {
            return res.status(404).json({
                status: false,
                message: "Order not found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Order retrieved successfully!",
            data: order
        });

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const _delete = (async (req, res) => {

    const order_id = req.params.order_id;

    try {

        const order = await OrderModel.deleteOne({ order_id: order_id });

        if (order.deletedCount === 0) {
            return res.status(404).json({
                status: false,
                message: "Order with given order_id not found!",
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Order deleted successfully!",
            data: order
        });

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

const update = (async (req, res) => {

    const order_id = req.body.order_id;
    const deliver_date = req.body.delivery_date;
    try {

        console.log(deliver_date, "sdfsdfd", req.body.delivery_date);

        const order = await OrderModel.findOneAndUpdate(
            { order_id: order_id },
            { $set: { delivery_date: deliver_date } },
            { returnOriginal: false }
        );

        if (!order) {
            return res.status(404).json({
                status: false,
                message: 'Order not found!',
                data: {}
            });
        }

        return res.status(200).json({
            status: true,
            message: "Order updated successfully!",
            data: order
        });

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: {}
        });
    }
});

module.exports = {
    create,
    list,
    delete: _delete,
    search,
    update
};