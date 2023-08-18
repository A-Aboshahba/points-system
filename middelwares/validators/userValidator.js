const { param, body } = require("express-validator");

module.exports.newTransaction = [
  body("sender_id")
    .notEmpty()
    .withMessage("sender_id cant be blank")
    .isInt()
    .withMessage("sender_id must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("sender_id must be a positive integer");
      }
      return true;
    }),
  body("receiver_id")
    .notEmpty()
    .withMessage("receiver_id cant be blank")
    .isInt()
    .withMessage("receiver_id must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("receiver_id must be a positive integer");
      }
      return true;
    }),
  body("amount")
    .notEmpty()
    .withMessage("amount cant be blank")
    .isInt()
    .withMessage("amount must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("amount must be a positive integer");
      }
      return true;
    }),
];

module.exports.confirmTransaction = [
  body("sender_id")
    .notEmpty()
    .withMessage("sender_id cant be blank")
    .isInt()
    .withMessage("sender_id must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("sender_id must be a positive integer");
      }
      return true;
    }),
  body("transaction_id")
    .notEmpty()
    .withMessage("transaction_id cant be blank")
    .isInt()
    .withMessage("transaction_id must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("transaction_id must be a positive integer");
      }
      return true;
    }),
];

module.exports.getUserPoints = [
  param("id")
    .isInt()
    .withMessage("userId must be numerical")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("userId must be a positive integer");
      }
      return true;
    }),
];
