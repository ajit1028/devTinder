const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://bhajit1028:Q4mWjNR6Qpe35bWH@nodejslearn.rbhqv.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
