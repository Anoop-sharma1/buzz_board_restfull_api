const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/db.config");
const { notFound, errorHandler } = require("./middlewares/error.handler");
require("dotenv").config();

const app = express();

const PORT = process.env.port || 5000;

//Connect mongodb database
dbConnect();

//Register middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//register endpoint
app.use("/api/v1/orders", require("./routes/order.route"));

//Handle incorrect routes
app.use("*", (req, res) => {
    return res.status(404).json({
        status : false,
        message : "Incorrect route please check for typo and request type!",
        data : {}
    });
});

//Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
