const { model, Schema, SchemaTypes } = require("mongoose");
const { hash } = require("bcrypt");

const schema = new Schema(
    {
        email: {
            type: SchemaTypes.String,
            required: true,
        },
        password: {
            type: SchemaTypes.String,
            required: true,
        },
        role: {
            type: SchemaTypes.String,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
});

const Model = model("user", schema);

module.exports = Model;
