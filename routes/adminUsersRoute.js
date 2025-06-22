const { getUsers } = require("../controller/admin/users/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restricTo = require("../middleware/restricTo");
const { catchAsync } = require("../services/catchAsync");

const router = require("express").Router();

router
  .route("/users")
  .get(isAuthenticated, restricTo("admin"), catchAsync (getUsers));

module.exports = router;
