const express = require("express");
require("express-async-errors");
require('dotenv').config();

const sparePartsRouter = require("./routes/spareParts.js");
const usersRouter = require("./routes/users.js");
const adminsRouter = require("./routes/admins.js");
const auth = require("./middlewares/auth.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

const port = process.env.PORT || 2000;

const connectDB = require("./config/db.js");

app.use(express.json());

connectDB();

app.use("/admin", adminsRouter);
app.use(usersRouter);
app.use("/spare-parts", sparePartsRouter);

app.use((_, res) => {
    res.status(404).send("page not found!!!");
});

app.use(errorHandler);

app.listen(port, () => console.log(`server up and running... on port ${port}`));
