require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");
const userRouter = require("./routes/user-router");
const bikeRouter = require("./routes/bike-router");

const app = express();
const PORT = process.env.PORT;

//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB Connection Error : "));

app.use("/user", userRouter);
app.use("/bike", bikeRouter);

app.listen(PORT, () => {
  console.log(`Server Started On http://localhost:${PORT}`);
});
