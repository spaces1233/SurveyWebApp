const bcrypt = require('bcryptjs');

const User = require("../models/user");

// should not allow every user to CURD other users unless that user is admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // please review other user route, should not return the user object as it will return the hashed password, not a good practice
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateUser = async (req, res) => {
  // check the input, username, email should be valid
  const { username, email, role } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Apis that only allow CRUD of current login user, please refactor them and made them DRY

exports.getCurrentUser = async (req, res) => {
  const user = req.user ?? {};
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  try {
    const { email, username, role } = await User.findById(user.id);
    if (!email || !username) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ email, username, role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateCurrentUser = async (req, res) => {
  const user = req.user ?? {};
  // add validation
  const { username, email, password } = req.body;
  if (!user || !username || !email) {
    return res.status(404).json({ msg: "Invalid Input" });
  }
  
  try {
    let existUser = await User.findById(user.id);
    if (!existUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    existUser.username = username || existUser.username;
    existUser.email = email || existUser.email;
    if(password){
      const salt = await bcrypt.genSalt(10);
      existUser.password = await bcrypt.hash(password, salt);
    }
    await existUser.save();
    res.json(existUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteCurrentUser = async (req, res) => {
  const user = req.user ?? {};
  // add validation
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  try {
    await User.findByIdAndDelete(user.id);
    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
