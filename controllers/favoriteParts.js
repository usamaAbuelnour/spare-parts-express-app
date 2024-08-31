const FavoritePartModel = require("../models/favoritePart");
const logger = require("../logs/logger");
const sparePartValidationSchema = require("../utils/sparePartValidate");
const CustomError = require("../utils/CustomError");

const getFavoriteParts = async (req, res) => {
    const { id } = req.user;
    const parts = await FavoritePartModel.find(
        { userId: id },
        { userId: false }
    );
    if (parts.length) res.status(200).send(parts);
    else {
        logger.info("You have no favorite parts yet!!");
        res.send("You have no favorite parts yet!!");
    }
};

const setFavoriteParts = async (req, res) => {
    try {
        await sparePartValidationSchema.validate(req.body, {
            stripUnknown: false,
        });
    } catch (error) {
        throw new CustomError(422, error.message);
    }

    const existingPart = await FavoritePartModel.findOne({
        title: req.body.title,
    });

    if (existingPart)
        return res.status(409).send("This part already exists in your favorite list ");

    const { id } = req.user;
    await FavoritePartModel.create({ userId: id, ...req.body });
    res.status(201).send("Part added to favorite list");
};

const deleteFavoriteParts = async (req, res) => {
    const { id: partId } = req.params;
    const deletedPart = await FavoritePartModel.findByIdAndDelete(partId);
    if (deletedPart) {
        res.send("Part deleted");
        logger.info("Part deleted");
    } else res.status(422).send("there's no such part in your favorite list!!");
};

module.exports = { getFavoriteParts, setFavoriteParts, deleteFavoriteParts };
