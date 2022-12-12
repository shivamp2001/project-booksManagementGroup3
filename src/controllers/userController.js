const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const errorHandler = require("../errorHandling/errorHandling");

//create user
const createUser = async (req, res) => {
  try {
    const usersData = await userModel.create(req.body);
    return res
    .status(201)
    .send({ status: true, message: "Success", data: usersData });
    } catch (err) {
      return errorHandler(err, res);
    }
  };
  //login
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;

    const userData = await userModel.findOne({ email, password });
    if (!userData)
      return res.status(404).send({
        status: false,
        message: "E-mail or Password is incorrect",
      });

    const token = jwt.sign({ userId: userData._id }, "group-3", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .send({ status: true, message: "Success", data: token });
  } catch (err) {
    return errorHandler(err, res);
  }
};
module.exports = { createUser, login };
