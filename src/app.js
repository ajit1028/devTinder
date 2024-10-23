const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("akdmlsanla");
    res.send("User Data Send");
  } catch (error) {
    res.status(500).send("Some error  contact  support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) res.status(500).send("something went wrong");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
