const Yup = require("yup");

const itemSchema = Yup.object().shape({
    image: Yup.string().required(),
    item: Yup.string().required(),
    quantity: Yup.number().required(),
    price: Yup.number().required(),
});

const userOrderValidationSchema = Yup.object().shape({
    items: Yup.array().of(itemSchema).min(1, "At least one part is required"),
    totalPrice: Yup.number().required(),
});

const adminOrderValidationSchema = Yup.object()
    .shape({
        status: Yup.string().oneOf(["accepted", "rejected"]).required(),
    })
    .noUnknown(true, "You should only include status field nothing more!");

module.exports = { userOrderValidationSchema, adminOrderValidationSchema };
