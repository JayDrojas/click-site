const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/click-site", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!!");
});

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
