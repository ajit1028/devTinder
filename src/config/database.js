const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://bhajit1028:YmVLFCb8SEUaNtvP@nodejslearn.rbhqv.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
