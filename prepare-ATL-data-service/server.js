require("dotenv").config();

const cors = require("cors");
const models = require("./models/ATL_data.js");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.ATL_DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

const ATLDataRouter = require("./routes/prepare_ATL_data");
const ATLDataApiRouter = require("./routes/ATL_api");
app.use("/", ATLDataRouter);
app.use("/ATL", ATLDataApiRouter);

app.listen(3001, () => console.log("Server started on port 3001"));
