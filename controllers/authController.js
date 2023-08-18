const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.login = async (request, response, next) => {
  try {
    response.status(200).json("user loged in");
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};

exports.signup = async (request, response, next) => {
  try {
    response.status(201).json("user signed up");
  } catch (err) {
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
