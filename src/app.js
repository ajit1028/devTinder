const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//Handle Auth Middleware for all GET POST ,......requests
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send(" User  Data Send");
});

app.get("/user/login", (req, res) => {
  res.send("login successfully");
});

app.get("/admin/getAllData", (req, res) => {
  res.send(" All Data Send");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Delete All Data");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
