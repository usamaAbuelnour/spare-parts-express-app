const bcrypt = require("bcrypt");

const UserModel = require("../models/user.js");
const generateToken = require("../utils/generateToken.js");
const accountValidationSchema = require("../utils/accountValidationScheme.js");
const CustomError = require("../utils/CustomError.js");

const signUp = async (req, res) => {
    await accountValidationSchema.validateAsync(req.body);

    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
        throw new CustomError(409, "Email already exists!!")

    const user = await UserModel.create({ name, email, password });
    if (user) {
        res.status(201).send({
            id: user._id,
            email: user.email,
            token: await generateToken(user._id),
        });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send({
            id: user._id,
            email: user.email,
            token: await generateToken(user._id),
        });
    } else throw new CustomError(401, "email or password is incorrect")
};

module.exports = { logIn, signUp };
