const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" }); //point to the file
const transactions = require("./routes/transactions");
const connectDB = require("./config/db");
connectDB();

const app = express();

//middleware:
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//make a request to that path routes to the 'transactions' file.
// chiar daca in fisierul respectiv ai pus doar / la path
app.use("/api/v1/transactions", transactions);

//put this BELLOW the api routes:
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  //for anything besides our api defined above this,
  // we wanna hit the index.html that is in the build dir
  //because when we build for production, react puts stuff in that build dir
  app.get("*", (req, res) => {
    // __dirname is the current dir
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `s rnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
