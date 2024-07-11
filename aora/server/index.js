const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Auth = require("./routes/AuthRoutes");
const bodyParser = require("body-parser");
//dotenv
dotenv.config();
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

console.log("server");
app.use(bodyParser.json());
//port
const PORT=process.env.PORT||8080
app.use("/auth", Auth.router);
app.listen(PORT, () => {
  console.log(`server is listing to ${PORT}`);
});
