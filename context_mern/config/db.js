const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //second param is an obj with properties that will stop some mongoose warnings
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(
      `mongodb connected ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log(`err: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
