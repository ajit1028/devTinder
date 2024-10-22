const express = require("express");

const app = express();

//This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Ajit", lastName: "Singh" });
});

app.post("/user", (req, res) => {
  //save data in database
  res.send("Data is save into DB");
});

app.delete("/user", (req, res) => {
  res.send("deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("Test from server ");
});

// app.use("/", (req, res) => {
//   res.send("Home from server");
// });
app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
