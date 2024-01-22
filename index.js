const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT;

app.use("/api", require("./src/controllers/BookController"));
app.use("/api", require("./src/controllers/AuthController"));

app.listen(PORT, () => {
  console.log(`This api is running on port:${PORT}`);
});
