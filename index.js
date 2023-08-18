const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const database = require("./database");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

//############################################################################
const server = express();
let port = process.env.PORT || 8080;

//############################################################################
server.use(express.json());
server.use(morgan("common"));

//####__server_and_db_initialization__########################################
database
  .query("SELECT 1")
  .then((data) => {
    console.log("DB Connected successfully");
    const expressServer = server.listen(port, () => {
      console.log(`server is listening at port: ${port}`);
    });
  })
  .catch((error) => console.log("database connection failed cuz: " + error));

//#####################################################__routes__##########################################################
server.use("/auth", authRoute);
server.use("/user", userRoute);

//#####################__not-found-middleware__#############################
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found..!" });
});

//###################__error-global-middleware__#################################
server.use((error, request, response, next) => {
  // console.log(error);
  response.status(error.status || 505).json({ message: error + "" });
});
