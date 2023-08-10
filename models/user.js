const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
    trim: true,
  },

  mfdUnit: {
    type: String,
  },

  unitAddress: {
    type: String,
  },

  phone: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
  },

  gstNo: {
    type: String,
  },

  aadhaarOrPan: {
    type: String,
  },

  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },

  productDeal: {
    type: String,
    enum: {
      values: ["Shirts", "T-Shirts", "Jeans", "Trousers"],
      message: "{VALUE} is not supported",
    },
  },

  bankAccount: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password should contain atlest 8 letters"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  verificationToken: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  verified: Date,

  passwordToken: {
    type: String,
  },

  passwordTokenExpirationDate: {
    type: Date,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
