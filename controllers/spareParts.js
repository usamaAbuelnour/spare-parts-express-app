const logger = require("../logs/logger.js");
const SparePartModel = require("../models/sparePart.js");
const CustomError = require("../utils/CustomError.js");

const getSpareParts = async (req, res) => {
    if (req.query.page !== undefined && isNaN(req.query.page))
        throw new CustomError(400, "page number must be a number!!!");

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const sparePartsCount = await SparePartModel.countDocuments();
    const pagesCount = Math.ceil(sparePartsCount / limit);

    if (req.query.page > pagesCount)
        throw new CustomError(
            400,
            "The provided page number exceeds the total page count!!"
        );

    if (req.query.page <= 0)
        throw new CustomError(
            400,
            "The provided page number can't be negative or equal zero!!"
        );

    const spareParts = await SparePartModel.find().skip(skip).limit(limit);
    if (spareParts.length)
        res.send({
            spareParts,
            pagesCount,
            currentPage: page,
            prev: page > 1,
            next: page < pagesCount,
        });
    else {
        logger.info("There're no spare parts!!");
        res.send("There're no spare parts!!");
    }
};

module.exports = getSpareParts;
