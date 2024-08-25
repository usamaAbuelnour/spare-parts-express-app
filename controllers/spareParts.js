const logger = require("../logs/logger.js");
const SparePartModel = require("../models/sparePart.js");

exports.getSpareParts = async (_, res) => {
    // const spareParts = await SparePartModel.find({ user: req.user.id });
    const spareParts = await SparePartModel.find({});
    if (spareParts.length) res.send(spareParts);
    else {
        logger.info("You have no spare parts yet!!");
        res.send("You have no spare parts yet!!");
    }
};

exports.setSparePart = async (req, res) => {
    const existingSparePart = await SparePartModel.findOne({
        title: req.body.title,
    });
    
    if (existingSparePart)
        return res.status(409).send("spare part already exists ");

    const sparePart = await SparePartModel.create({
        ...req.body,
        // user: req.user.id,
    });
    logger.info("Post created");
    res.status(201).send(sparePart);
};

exports.updateSparePart = async (req, res) => {
    const { id } = req.params;
    const sparePart = await SparePartModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (sparePart) {
        res.send("Spare Part updated");
        logger.info("Spare Part Updated");
    } else res.status(422).send("no such id");
};

exports.deleteSparePart = async (req, res) => {
    const { id } = req.params;
    const deletedSparePart = await SparePartModel.findByIdAndDelete(id);
    if (deletedSparePart) {
        res.send("Spare part deleted");
        logger.info("Spare part deleted");
    } else res.status(422).send("no such id");
};
