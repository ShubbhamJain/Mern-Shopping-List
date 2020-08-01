let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let helmet = require("helmet");
let path = require("path");
require("dotenv").config();

let items = require("./routes/api/items");

const app = express();

const PORT = process.env.PORT || 5000;

let MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind("MongoDB connection error"));

app.use(bodyParser.json());

app.use(helmet());

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
