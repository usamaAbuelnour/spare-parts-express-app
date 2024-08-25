const { model, Schema, SchemaTypes } = require("mongoose");

const sparePartSchema = new Schema(
    {
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

const SparePartModel = model("sparePart", sparePartSchema);

module.exports = SparePartModel;
