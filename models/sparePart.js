const { model, Schema, SchemaTypes } = require("mongoose");
const UserModel = require("./user.js");

const schema = new Schema(
    {
        title: {
            type: SchemaTypes.String,
            required: true,
        },
        description: {
            type: SchemaTypes.String,
            required: true,
        },
        imgUrl: {
            type: SchemaTypes.String,
            required: true,
        },
        user: {
            type: SchemaTypes.ObjectId,
            // required: true,
            ref: "UserModel",
        },
    },
    { timestamps: true }
);

const Model = model("sparePart", schema);

module.exports = Model;
