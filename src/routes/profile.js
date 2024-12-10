const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request.");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.post("/profile/forgotPassword", async (req, res) => {
  try {
    const { emailId } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    const resetToken = jwt.sign({ id: user._id }, "DEV@Tinder$1092", {
      expiresIn: "1d",
    });

    res.json({
      message: "Password reset token generated successfully.",
      resetToken,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

profileRouter.post("/profile/resetPassword", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, "DEV@Tinder$1092");
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("Invalid token or user not found");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = profileRouter;
