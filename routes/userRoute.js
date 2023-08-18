const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const validator = require("../middelwares/validators/userValidator");
const validationError = require("../middelwares/validators/validationError");
const {
  verifyTokenAndAuthorizSender,
} = require("./../middelwares/authenicatedMW");

router
  .route("/new")
  .post(
    verifyTokenAndAuthorizSender,
    validator.newTransaction,
    validationError,
    controller.newTransaction
  );
router
  .route("/confirm")
  .post(
    verifyTokenAndAuthorizSender,
    validator.confirmTransaction,
    validationError,
    controller.confirmTransaction
  );
router
  .route("/points/:id")
  .get(
    verifyTokenAndAuthorizSender,
    validator.getUserPoints,
    validationError,
    controller.getUserPoints
  );
router.route("/allTransactions").get(controller.allTransactions);

module.exports = router;
