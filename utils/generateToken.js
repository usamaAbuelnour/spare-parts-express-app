const util = require("util");
const { sign } = require("jsonwebtoken");
const jwtSign = util.promisify(sign);

const generateToken = async (id) =>
    await jwtSign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

module.exports = generateToken;
