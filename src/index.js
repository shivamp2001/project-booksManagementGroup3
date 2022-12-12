const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
const multer=require('multer')

const app = express();
const port = 3000;
app.use(express.json());
app.use(multer().any())
app.use((err, req, res, next) => {
  if (err.message === "Unexpected end of JSON input") {
    return res
      .status(400)
      .send({
        status: false,
        message: "ERROR Parsing Data, Please Provide a Valid JSON",
      });
  } else {
    next();
  }
});

mongoose
  .connect(
    // "mongodb+srv://yashrajsinh09:yashraj2727@assignment.lhpfmud.mongodb.net/group3Database",
    "mongodb://yashrajsinh09:yashraj2727@ac-dvuehao-shard-00-00.lhpfmud.mongodb.net:27017,ac-dvuehao-shard-00-01.lhpfmud.mongodb.net:27017,ac-dvuehao-shard-00-02.lhpfmud.mongodb.net:27017/group3Database?ssl=true&replicaSet=atlas-dmoirr-shard-0&authSource=admin&retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, () => {
  console.log(`Express is Running on ${port}`);
});
