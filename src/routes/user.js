const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl about  age gender skills";

//GET all pending connections request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionsRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lasrtName"]);
    res.json({
      message: "Data fectched Suucessfully",
      data: connectionsRequests,
    });
  } catch (err) {
    res.status(404).send("Error : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionsRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionsRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = userRouter;
