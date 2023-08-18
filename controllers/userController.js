const CryptoJS = require("crypto-js");

module.exports.new = (request, response, next) => {
  try {
    response.status(200).json("new transfer created");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.confirm = (request, response, next) => {
  try {
    response.status(200).json("transfer confirmed");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.getUserPoints = (request, response, next) => {
  try {
    response.status(200).json("user points are: 500.");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
module.exports.allTransactions = (request, response, next) => {
  try {
    response.status(200).json("all transactions are: [....].");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
