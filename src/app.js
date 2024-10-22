const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Ajit", lastName: "Singh" });
});

// app.use("/", (req, res) => {
//   res.send("Home from server");
// });
app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
