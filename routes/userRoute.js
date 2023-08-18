const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const validator = require("../middelwares/validators/userValidator");
const validationError = require("../middelwares/validators/validationError");
const {
  isAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("./../middelwares/authenicatedMW");

router.route("/new").post(
  // isSender,
  validator.new,
  validationError,
  controller.new
);
router.route("/confirm").post(
  // isSender,
  validator.confirm,
  validationError,
  controller.confirm
);
router.route("/points/:id").get(
  // isSender,
  validator.getUserPoints,
  validationError,
  controller.getUserPoints
);
router.route("/allTransactions").get(controller.allTransactions);

module.exports = router;
