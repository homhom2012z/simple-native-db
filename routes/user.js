const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteById,
  deleteAll,
} = require("../controllers/user");

router.route("/register").post(createUser);
router.route("/delete/:id").delete(deleteById);
router.route("/users").get(getAllUsers);
router.route("/user/:id").get(getUser);
router.route("/user/edit/:id").patch(updateUser);
router.route("/deleteall").delete(deleteAll);

module.exports = router;
