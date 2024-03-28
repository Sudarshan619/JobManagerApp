const mongoose = require("mongoose");
const mongodbUrl = "mongodb://127.0.0.1:27017/test"; // Remove directConnection=true

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(mongodbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
