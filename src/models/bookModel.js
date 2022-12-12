const validator = require("validator");
const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
      trim: true,
      unique: true,
    },
    excerpt: { type: String, required: [true, "Please write excerpt"] },
    userId: {
      type: objectId,
      required: [true, "Please provide the userID"],
      ref: "User",
    },
    ISBN: {
      type: String,
      required: [true, "Please provide ISBN number"],
      trim: true,
      unique: true,
      validate: [
        validator.isISBN,
        "ISBN is invalid, please provide valid ISBN number",
      ],
    },
    bookCover:{type:String},
    category: {
      type: String,
      required: [true, "Please mention the category"],
      trim: true,
    },
    subcategory: {
      type: String,
      required: [true, "Please mention the Sub-Category"],
      trim: true,
    },
    reviews: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    releasedAt: {
      type: Date,
      required: [true, "Please mention the release date"],
    },
  },
  { timestamps: true }
);

bookSchema.pre("save", function (next) {
  this.title = this.title[0].toUpperCase() + this.title.slice(1);
  next();
});

module.exports = new mongoose.model("Book", bookSchema);
