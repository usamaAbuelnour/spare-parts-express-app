const { model, Schema, SchemaTypes } = require("mongoose");

const itemSchema = new Schema({
    item: {
        type: SchemaTypes.String,
        required: true,
    },
    quantity: {
        type: SchemaTypes.Number,
        require: true,
    },
    price: {
        type: SchemaTypes.Number,
        require: true,
    },
});

const orderSchema = new Schema(
    {
        userId: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: "user",
        },
        items: { type: [itemSchema], required: true },
        totalPrice: {
            type: SchemaTypes.Number,
            required: true,
        },
        status: {
            type: SchemaTypes.String,
            default: "waiting",
        },
    },
    { timestamps: true }
);

const OrderModel = model("order", orderSchema);

module.exports = OrderModel;
