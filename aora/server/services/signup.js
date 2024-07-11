const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function createUser(userData) {
  const { name, password } = userData;
  const userExist = await User.findOne({ email });
  const email = userData.email.toLowerCase();
  console.log(name);
  if (userExist?.email) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await createUser.save();
  return true;
}

module.exports = { createUser };
