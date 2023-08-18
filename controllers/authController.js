const database = require("../database");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.signup = async (request, response, next) => {
  try {
    const { email, name, password } = request.body;
    const insertQuery = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`;
    const createdUser = await database.query(insertQuery, [
      email,
      name,
      CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    ]);
    response.status(201).json(createdUser);
  } catch (err) {
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
exports.login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const selectQuery = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await database.query(selectQuery, [email]);
    [user] = rows;
    // Check if a user with matching credentials exists
    if (rows.length === 1) {
      const hashedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPass.toString(CryptoJS.enc.Utf8);
      if (originalPassword === password) {
        const accessToken = jwt.sign(
          {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            points: user.points,
          },
          process.env.JWT_SEC_KEY,
          {
            expiresIn: "1d",
          }
        );
        response.status(200).json({ accessToken });
      } else {
        // Invalid password
        let error = new Error("Invalid email or password");
        error.status = 401;
        next(error);
      }
    } else {
      // Invalid email
      let error = new Error("Invalid email or password");
      error.status = 401;
      next(error);
    }
  } catch (err) {
    console.log(err);
    let error = new Error(err);
    error.status = 401;
    next(error);
  }
};
