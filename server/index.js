const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/index.js");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/click-site", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!!");
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('react-app/build'))
}

app.use(cors())
// HTTP request logger
app.use(morgan("tiny"));
app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
