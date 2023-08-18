const jwt = require("jsonwebtoken");
const verifyToken = (request, response, next) => {
  //check if the request has token
  const authHeader = request.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) {
        let error = new Error("Token is not valid.!");
        error.status = 403;
        throw error;
      } else {
        request.accessToken = user;
        next();
      }
    });
  } else {
    let error = new Error("you are not authenticated.!");
    error.status = 401;
    // next(error);
    throw error;
  }
};
const verifyTokenAndAuthorizSender = (request, repsone, next) => {
  verifyToken(request, repsone, () => {
    console.log(request.accessToken.user_id, request.body.sender_id);
    if (
      request.accessToken.user_id == request.body.sender_id ||
      request.accessToken.user_id == request.params.id
    )
      next();
    else {
      console.log("asd");
      let error = new Error("not Authorized..!");
      error.status = 403;
      throw error;
    }
  });
};

module.exports = {
  verifyTokenAndAuthorizSender,
};
