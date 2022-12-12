const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");
const errorHandler = require("../errorHandling/errorHandling");
const { isValidObjectId } = require("mongoose");
const aws=require('../aws/aws')

exports.authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(401)
        .send({ status: false, msg: "You are not logged in" });
    }
    const decodeToken = jwt.verify(token, "group-3");
    req.token = decodeToken;
    next();
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.awsmiddleware=async (req,res,next)=>{
  let files= req.files
  if(files && files.length>0){
     
      let uploadedFileURL= await aws.uploadFile( files[0] )
      res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
      console.log(uploadedFileURL)
      req.uploadedFileURL=uploadedFileURL.Location
  }
  else{
      res.status(400).send({ msg: "No file found" })
  }
  next()
}

exports.authorization = async (req, res, next) => {
  try {
    if (req.body.userId) {
      if (!isValidObjectId(req.body.userId)) {
        return res
          .status(400)
          .send({ status: false, message: "User ID is not valid" });
      }
    }

    if (req.params.bookId) {
      if (!isValidObjectId(req.params.bookId)) {
        return res
          .status(400)
          .send({ status: false, message: "Book ID is not valid" });
      }
      const book = await bookModel.findOne({ _id: req.params.bookId });
      if (!book) {
        return res
          .status(404)
          .send({ status: false, message: "No book exist with this ID" });
      }
      var books = JSON.parse(JSON.stringify(book)); //Deep Copy
      const userId = books.userId;

      if (req.token.userId != userId) {
        return res.status(403).send({
          status: false,
          msg: "You are not authorized to perform this action",
        });
      }
    }
    if (req.body.userId) {
      const userId = req.body.userId;

      if (req.token.userId != userId) {
        return res.status(403).send({
          status: false,
          msg: "You are not authorized to perform this action, please provide valid USER ID",
        });
      }
    }
    next();
  } catch (err) {
    return errorHandler(err, res);
  }
};
