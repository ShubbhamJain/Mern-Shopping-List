let express = require("express");
let mongoose = require("mongoose");
let helmet = require("helmet");
let path = require("path");
const config = require("config");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// let MONGO_URI = process.env.MONGO_URI;

mongoose.connect(config.get("MONGO_URI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind("MongoDB connection error"));

app.use(express.json());

app.use(helmet());

app.get("/favicon.ico", (req, res) => res.status(200).json());

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
