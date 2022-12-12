const express = require("express");
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
const reviewController = require("../Controllers/reviewController");
const middleware = require("../Middleware/auth");
const router = express.Router();

router.post("/register", userController.createUser);//create user
router.post("/login", userController.login);//login

//aws-s3 link
router.post('/createawsurl',bookController.createAwsurl)

//create book
router.post("/books",middleware.authentication,middleware.authorization,bookController.createBook);
//get books
router.get("/books", middleware.authentication, bookController.getBooks);

//get books by params bookId
router.get("/books/:bookId",middleware.authentication,bookController.getBooksById);

//update books by params
router.put("/books/:bookId",middleware.authentication,middleware.authorization,bookController.updateBooks);

//delete book by params
router.delete("/books/:bookId",middleware.authentication,middleware.authorization,bookController.deleteBook);


router.post("/books/:bookId/review", reviewController.createReview);//create review
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview);//update review
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview);//delete review

//create aws s3 link
router.post("/test-me",middleware.awsmiddleware)


router.all("*", (req, res) => {
  res.status(404).send(`Cannot find ${req.originalUrl}`);
});

module.exports = router;
