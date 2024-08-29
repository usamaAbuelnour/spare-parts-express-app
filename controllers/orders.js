const OrderModel = require("../models/order");
const logger = require("../logs/logger");

const getOrders = async (req, res) => {
    const { id } = req.user;
    console.log(id)
    const orders = await OrderModel.find({ userId: id }, {userId: false});
    if (orders.length) res.status(200).send(orders);
    else {
        logger.info("You have no orders yet!!");
        res.send("You have no orders yet!!");
    }
};

const setOrder = async (req, res) => {
    const { id } = req.user;
    await OrderModel.create({ userId: id, ...req.body });
    res.status(201).send("Order send... please wait for admin approval");
};

const deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (deletedOrder) {
        res.send("order deleted");
        logger.info("order deleted");
    } else res.status(422).send("there's no such order!!");
};

module.exports = { getOrders, setOrder, deleteOrder };
