const OrderModel = require("../models/order");
const logger = require("../logs/logger");
const { userOrderValidationSchema } = require("../utils/orderValidate");
const CustomError = require("../utils/CustomError");

const getOrders = async (req, res) => {
    const { id } = req.user;
    const orders = await OrderModel.find({ userId: id }, { userId: false });
    if (orders.length) res.status(200).send(orders);
    else {
        logger.info("You have no orders yet!!");
        res.send("You have no orders yet!!");
    }
};

const setOrder = async (req, res) => {
    try {
        await userOrderValidationSchema.validate(req.body);
    } catch (error) {
        throw new CustomError(422, error.message);
    }
    const { id } = req.user;
    await OrderModel.create({ userId: id, ...req.body });
    res.status(201).send("Order send... please wait for admin approval");
};

module.exports = { getOrders, setOrder };
