const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Home  server");
// });
app.use("/Hello", (req, res) => {
  res.send("Hello  Ajit ");
});
app.use("/test", (req, res) => {
  res.send("Test from server ");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
