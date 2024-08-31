const Yup = require("yup");

const sparePartValidationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    quantity: Yup.number().required(),
    category: Yup.string().required(),
    manufacturer: Yup.string().required(),
    image: Yup.string().url().required(),
    manufactureCountry: Yup.string().required(),
    vehicleType: Yup.string().required(),
    vehicleYear: Yup.string().required(),
    vehicleMaker: Yup.string().required(),
    vehicleModel: Yup.string().required(),
}).noUnknown(true, 'Invalid fields detected');

module.exports = sparePartValidationSchema;