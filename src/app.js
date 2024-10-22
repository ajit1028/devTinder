const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling the route");
    //res.send("Hello from server");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route2");
    //res.send("Hello from server2");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route3");
    // res.send("Hello from server3");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route4");
    // res.send("Hello from server4");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route5");
    res.send("Hello from server5");
    // next();
  }
);

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
