const NativeDB = require("../db/NativeDB");

const db = new NativeDB.NativeDB();

const getAllUsers = (req, res) => {
  const allUser = db.User({})._find();
  let users = "";
  allUser._data.users.map(
    (user) =>
      (users += `<div>${user.username} <a href="/api/v1/user/${user.id}">View</a></div>`)
  );
  res.send(allUser);
};

const getUser = (req, res) => {
  const userData = db.User({})._findOne(req.params.id);
  res.send(userData);
};

const createUser = (req, res) => {
  const { username, email } = req.body;
  console.log(username, email);
  db.User({ username: username, email: email })._save();
  res.end("Register successfully");
};

const updateUser = (req, res) => {
  const { id, username, email } = req.body;
  db.User({})._updateOne({ id, username, email });

  res.status(200).end("User updated.");
};

const deleteById = (req, res) => {
  const { id } = req.params;
  try {
    db.User({})._deleteById(id);
  } catch (error) {
    return res.end(`Error ${error.code}: ${error.message}`);
  }
  res.status(200).end(`User: ${id} deleted.`);
};

const deleteAll = (req, res) => {
  try {
    db.User({})._deleteAll();
  } catch (error) {
    return res.end(`Error ${error.code}: ${error.message}`);
  }
  res.status(200).end(`All user was deleted.`);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteById,
  deleteAll,
};
