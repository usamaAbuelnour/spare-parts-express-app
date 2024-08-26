const logger = require("../logs/logger.js");
const SparePartModel = require("../models/sparePart.js");

exports.getSpareParts = async (_, res) => {
    const spareParts = await SparePartModel.find({});
    if (spareParts.length) res.send(spareParts);
    else {
        logger.info("You have no spare parts yet!!");
        res.send("You have no spare parts yet!!");
    }
};
