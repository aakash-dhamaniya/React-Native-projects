const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/jwt_db");
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", (error) => {
  console.log(`mongoDb conncetion error ${error}`);
});
module.exports = mongoose;
