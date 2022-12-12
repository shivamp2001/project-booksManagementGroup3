const validator = require("validator");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title"],
      trim: true,
      enum: {
        values: ["Mr", "Mrs", "Miss"],
        message: "Title can only be Mr, Mrs or Miss",
      },
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
      validate: {
        validator: function (val) {
          if (typeof val === "undefined") return false;
          if (typeof val != "string" && val.trim().length === 0) return false;
          const regex = /^[a-z/\s/A-Z]{3,100}$/;
          return regex.test(String(val));
        },
        message: "Name can only contain letters",
      },
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
      unique: true,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
    },
    email: {
      type: String,
      required: [true, "Please provide your E-mail"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid E-mail ID"],
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
      minlength: [8, "Password should be between 8-15 characters"],
      maxlength: [15, "Password should be between 8-15 characters"],
    },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String }
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", UserSchema);
 