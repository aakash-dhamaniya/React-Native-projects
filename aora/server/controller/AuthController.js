const userService = require("../services/signup");
const loginService = require("../services/login");
async function creteUser(req, res) {
  console.log(res.body);
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    console.log(user);
    res.status(201).json(user ? "userCreated" : "user already exist");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
async function loginUser(req, res) {
  try {
    const userCredentials = req.body;
    
    const auth = await loginService.loginUser(userCredentials);
    console.log("auth==>", auth);
    if (auth) {
      res.cookie("acessToken", auth.accessToken, { maxAge: 60000 });
      res.cookie("refreshToken", auth.refreshToken, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res.status(200).json({ login: true });
    }
    return res.status(401).json({ login: false });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
module.exports = { creteUser, loginUser };
