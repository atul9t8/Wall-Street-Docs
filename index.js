const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const userRouter = require("./routers/userRouter");
const textRouter = require("./routers/textRouter");
const textCountRouter = require("./routers/textCounterRouter");

require("dotenv").config();
mongoose.connect(process.env.DB);

app.use("/", userRouter);
app.use("/text", textRouter);
app.use("/count", textCountRouter);

port = process.env.PORT || 8088;

app.listen(port, () => console.log("Listening"));
