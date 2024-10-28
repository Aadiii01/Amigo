import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    userName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: function (value) {
          return this.googleId ? true : !!value;
        },
        message: "Username is required!!",
      },
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    password: {
      type: String,
      validate: [
        {
          validator: function (value) {
            // If the user signed in via Google (googleId exists), password is not required
            return this.googleId ? true : !!value;
          },
          message: "Password is required for non-Google users.",
        },
        {
          validator: function (value) {
            // Only validate password strength if a password is provided (for non-Google users)
            if (this.googleId) return true; // Skip strong password validation for Google OAuth users
            return validator.isStrongPassword(value);
          },
          message: "Enter a Strong Password.",
        },
      ],
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/zru3eyxdmilwnujzzy27",
    },
    photos: {
      type: String,
      default: "https://res.cloudinary.com/djpeymtc8/image/upload/f_auto,q_auto/t3jfpgxxuxxgr8rkp1us",
    },
    address: {
      state: {
        type: String,
        trim: true,
        index: true
      },
      city: {
        type: String,
        trim: true,
        index: true
      },
      pincode: {
        type: Number,
        trim: true,
        index: true
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // enum: ["Male", "Female", "Others"],
      // lowercase: true,
      trim: true,
    },
    about: {
      type: String,
      default: `Hey i join the Amigo recently`,
      trim: true,
    },
    interest: {
      type: [String],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isProfilesetup: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAcessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      emailId: this.emailId,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = jwt.sign(
    {_id: this._id},
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: process.env.RESET_PASSWORD_EXPIRY}
  );
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken
}

userSchema.methods.createEmailVerificationToken = async function () {
  const verificationToken  = jwt.sign(
    { _id: this._id },
    process.env.EMAIL_VERIFICATION_SECRET,
    {expiresIn: process.env.EMAIL_VERIFICATION_EXPIRY}
  );
  this.emailVerificationToken = verificationToken;
  this.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return verificationToken;
}

export const User = mongoose.model("User", userSchema);