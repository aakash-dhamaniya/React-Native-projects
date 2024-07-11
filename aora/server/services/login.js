const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "TheAakash";
async function loginUser(credentials) {
  const { password } = credentials;
  const email = credentials.email.toLowerCase();
  const userLoginData = await User.findOne({ email });
  console.log(userLoginData);
  if (!userLoginData.email) return "email not found";
  console.log(userLoginData?.password);
  const isMatch = await bcrypt.compare(password, userLoginData?.password);
  console.log("isMatch==>", isMatch);
  if (isMatch) {
    const accessToken = jwt.sign({ email, password }, secretKey, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign({ email, password }, secretKey, {
      expiresIn: "5m",
    });
    return { accessToken, refreshToken };
  }
  return false;
}
module.exports = { loginUser };
