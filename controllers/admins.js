const { compare } = require("bcrypt");
const UserModel = require("../models/user.js");
const generateToken = require("../utils/generateToken.js");
const accountValidationSchema = require("../utils/userValidate.js");
const CustomError = require("../utils/CustomError.js");

const getAllUsers = async (req, res) => {
    const user = await UserModel.findById(req.user.id);
    if (user.role !== "admin") throw new CustomError(401, "Admins only");

    const users = await UserModel.find();
    res.send(users);
};

const logIn = async (req, res) => {
    await accountValidationSchema.validateAsync(req.body);

    const { email, password } = req.body;
    const admin = await UserModel.findOne({ email });
    if (admin.role !== "admin") throw new CustomError(401, "Admins only");

    if (admin && (await compare(password, admin.password))) {
        res.send({
            id: admin._id,
            email: admin.email,
            token: await generateToken(admin._id),
        });
    } else throw new CustomError(400, "email or password is incorrect");
};

module.exports = { getAllUsers, logIn };
