const mongoose = require("mongoose");
const UserModel = require("../models/user");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongo Connected: ${connection.connection.host}`);

        const existingAdmin = await UserModel.findOne({ role: "admin" });
        if (!existingAdmin) {
            await UserModel.create({
                name: "admin",
                email: "admin@admin.com",
                password: "12345678",
                role: "admin",
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
