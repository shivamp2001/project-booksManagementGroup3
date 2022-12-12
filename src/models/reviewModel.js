const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: objectId,
    required: [true, "Please provide BookID"],
    ref: "Book",
  },
  reviewedBy: {
    type: String,
    required: [true, "Please mention your name"],
    trim: true,
    default: "Guest",
  },
  reviewedAt: {
    type: Date,
    required: [true, "Please input date"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide the rating"],
    min: [1, "Rating should be between 1-5"],
    max: [5, "Rating should be between 1-5"],
  },
  review: {
    type: String,
  },
  isDeleted: { type: Boolean, default: false },
},
{ timestamps: true }
);

module.exports = new mongoose.model("Review", reviewSchema);
