const Yup = require("yup");

const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is a required field!!"),
    email: Yup.string()
        .required("Email is a required field!!")
        .matches(
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
            "Enter a valid email"
        ),
    password: Yup.string()
        .min(8)
        .max(20)
        .required("Password is a required field"),
    // .matches(/o+/, "Password should include o"),
    role: Yup.string().optional().oneOf(["admin", "user"]),
});

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field!!")
        .matches(
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
            "Enter a valid email"
        ),
    password: Yup.string()
        .min(8)
        .max(20)
        .required("Passwrod is a required field"),
    // .matches(/o+/, "Password should include o"),
});

module.exports = { registerValidationSchema, loginValidationSchema };
