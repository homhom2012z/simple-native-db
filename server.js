require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const data = require("./db/storage/_db1.json");
const User = require("./db/User");
const NativeDB = require("./db/NativeDB");

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const userRoute = require("./routes/user");

server.use("/api/v1", userRoute);

server.get("/", (req, res) => {
  res.end(`<div><h3>Simple Native DB</h3></div>`);
});

const db = new NativeDB.NativeDB();

const startServer = () => {
  server.listen(process.env.PORT, () => {
    db.connect("_db1");
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

startServer();
