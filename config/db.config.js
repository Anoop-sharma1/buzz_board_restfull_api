const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URl || "mongodb://localhost:27017/buzz-board-api" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Database error!");
    throw new Error("There is some issue with the connection!", error.message);
  }
};
module.exports = dbConnect;
