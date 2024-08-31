const { model, Schema, SchemaTypes } = require("mongoose");

const favoritePartSchema = new Schema(
    {
        userId: {
            type: SchemaTypes.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: SchemaTypes.String,
            required: true,
        },
        description: {
            type: SchemaTypes.String,
            required: true,
        },
        price: {
            type: SchemaTypes.Number,
            required: true,
        },
        quantity: {
            type: SchemaTypes.Number,
            required: true,
        },
        category: {
            type: SchemaTypes.String,
            required: true,
        },
        manufacturer: {
            type: SchemaTypes.String,
            required: true,
        },
        image: {
            type: SchemaTypes.String,
            required: true,
        },
        manufactureCountry: {
            type: SchemaTypes.String,
            required: true,
        },
        vehicleType: {
            type: SchemaTypes.String,
            required: true,
        },
        vehicleYear: {
            type: SchemaTypes.String,
            required: true,
        },
        vehicleMaker: {
            type: SchemaTypes.String,
            required: true,
        },
        vehicleModel: {
            type: SchemaTypes.String,
            required: true,
        },
    },
    { timestamps: true }
);

const FavoritePartModel = model("favoritePart", favoritePartSchema);

module.exports = FavoritePartModel;
