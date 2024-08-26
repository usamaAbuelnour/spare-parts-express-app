const { compare } = require("bcrypt");
const UserModel = require("../models/user.js");
const generateToken = require("../utils/generateToken.js");
const { loginValidationSchema } = require("../utils/userValidate.js");
const CustomError = require("../utils/CustomError.js");
const SparePartModel = require("../models/sparePart.js");
const logger = require("../logs/logger.js");
const sparePartValidationSchema = require("../utils/sparePartValidate.js");

const login = async (req, res) => {
    try {
        await loginValidationSchema.validate(req.body);
    } catch (error) {
        throw new CustomError(422, error.message);
    }
    const { email, password } = req.body;
    const admin = await UserModel.findOne({ email });

    if (admin && (await compare(password, admin.password))) {
        if (admin.role === "user")
            throw new CustomError(403, "Normal users are not welcome here!!");
        res.send({
            id: admin._id,
            email: admin.email,
            token: await generateToken(admin._id),
        });
    } else throw new CustomError(401, "email or password is incorrect");
};

const getSpareParts = async (_, res) => {
    const spareParts = await SparePartModel.find({});
    if (spareParts.length) res.send(spareParts);
    else {
        logger.info("You have no spare parts yet!!");
        res.send("You have no spare parts yet!!");
    }
};

const setSparePart = async (req, res) => {
    try {
        await sparePartValidationSchema.validate(req.body);
    } catch (error) {
        throw new CustomError(422, error.message);
    }

    const existingSparePart = await SparePartModel.findOne({
        title: req.body.title,
    });

    if (existingSparePart)
        return res.status(409).send("Spare part already exists ");

    const sparePart = await SparePartModel.create({
        ...req.body,
    });
    logger.info("Spare part created");
    res.status(201).send(sparePart);
};

const updateSparePart = async (req, res) => {
    const { id } = req.params;
   
    if (!Object.keys(req.body).length) throw new CustomError(422, "there's no data sent!!")
   
        const sparePart = await SparePartModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    if (sparePart) {
        res.send("Spare part updated");
        logger.info("Spare part Updated");
    } else res.status(422).send("there's no such spare part!!");
};

const deleteSparePart = async (req, res) => {
    const { id } = req.params;
    const deletedSparePart = await SparePartModel.findByIdAndDelete(id);
    if (deletedSparePart) {
        res.send("Spare part deleted");
        logger.info("Spare part deleted");
    } else res.status(422).send("there's no such spare part!!");
};

module.exports = {
    login,
    getSpareParts,
    setSparePart,
    updateSparePart,
    deleteSparePart,
};
