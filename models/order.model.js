const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        order_id: {
            type: Number,
            required: true,
            unique: true
        },

        item_name: {
            type: String,
            required: true,
        },

        cost: {
            type: Number,
            required: true,
        },

        order_date: {
            type: Date,
            required: true
        },

        delivery_date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
