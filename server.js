const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const adminRouter = require("./routes/admin.js");
const userRouter = require("./routes/user.js");
const sparePartsRouter = require("./routes/spareParts.js");
const ordersRouter = require("./routes/orders.js");
const favoritePartsRouter = require("./routes/favoriteParts.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

const port = process.env.PORT || 2000;

const connectDB = require("./config/db.js");
const auth = require("./middlewares/auth.js");
const checkRole = require("./middlewares/checkRole.js");

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

connectDB();

app.use("/admin", adminRouter);
app.use(userRouter);
app.use("/spare-parts", sparePartsRouter);
app.use("/orders", auth, checkRole(["user"]), ordersRouter);
app.use("/favorite-parts", auth, checkRole(["user"]), favoritePartsRouter);

app.use((_, res) => {
    res.status(404).send("page not found!!!");
});

app.use(errorHandler);

app.listen(port, () => console.log(`server up and running... on port ${port}`));

module.exports = app;
