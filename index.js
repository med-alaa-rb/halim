const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", auth);
// parse application/json

const port = 3000;
app.listen(port, () =>
  console.log(`app is listening to http://localhost:${port}/`)
);
