require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const fs = require("fs");

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
    fs.chmodSync("/var/task/db/storage/_db1.json", "511", () => {
      console.log("CHMOD0777: _storage.json");
    });
    db.connect("_db1");
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
};

startServer();
