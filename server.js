const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const sparePartsRouter = require("./routes/spareParts.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

const port = process.env.PORT || 2000;

const connectDB = require("./config/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

connectDB();

app.use("/admin", adminRouter);
app.use(userRouter);
app.use("/spare-parts", sparePartsRouter);

app.use((_, res) => {
    res.status(404).send("page not found!!!");
});

app.use(errorHandler);

app.listen(port, () => console.log(`server up and running... on port ${port}`));

module.exports = app;
