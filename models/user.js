const { model, Schema, SchemaTypes } = require("mongoose");
const { hash } = require("bcrypt");

const userSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
        },
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

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await hash(this.password, 10);
    }
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
