import asyncHandler from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/user.models.js";
import uploadOnCloudinary from "../Utils/cloudinary.js";
import jwt from "jsonwebtoken";
import transporter from "../Utils/nodemailer.js";
import passport from "passport";
import fs from 'fs';
import path from 'path';

const generateAcessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAcessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return {accessToken,refreshToken}
  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating access and refresh token");
  }
}

const sendResetPasswordEmail = async (user) => {
  try {
    const templatePath = path.join(__dirname, 'Template', 'PasswordReset.html');
    htmlContent = htmlContent.replace('{{fullName}}', user.fullName);
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.emailId,
      subject: 'Passwors is Reset Successfull',
      html: htmlContent,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new ApiError(500, 'Error while sending the Password is reset Successfull email');
      }
    });
  } catch (error) {
    console.error('Error sending Password is reset Successfull email:', error);
  }
}

const sendWelcomeEmail = async (user) => {
  try {
    const templatePath = path.join(__dirname, 'Template', 'welcomeEmail.html');
    // Read the HTML template
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    // Replace the placeholder {{fullName}} with the actual user name
    htmlContent = htmlContent.replace('{{fullName}}', user.fullName);
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.emailId,
      subject: 'Welcome to Amigo!',
      html: htmlContent,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new ApiError(500, 'Error while sending the welcome email');
      }
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    // Handle or log the error based on your needs
  }
}

const sendVerificationEmail = asyncHandler(async (user, req) => {
  const verificationToken = await user.createEmailVerificationToken();
  await user.save({validateBeforeSave:false});

  const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/user/verify-email/${verificationToken}`;
  try {
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{fullName}}', user.fullName).replace('{{verificationURL}}', verificationURL);
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.emailId,
      subject: 'Email Verification',
      html: htmlContent
    };
    transporter.sendMail(mailOptions,(error,info) => {
      if (error) {
        throw new ApiError(500, "Error while sending the email");
      }
      res.status(200).json(
        new ApiResponse(200, {}, `Email Verification link sent to your ${user.emailId} email`)
      )
    })
  } catch (error) {
    throw new ApiError(500, "Error while sending the email");
  }
})

const verifyEmail = asyncHandler(async (req, res) => {
  const verifytoken = req.params.token;
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(verifytoken,process.env.EMAIL_VERIFICATION_SECRET);
  } catch (error) {
    throw new ApiError(401,"Invalid or expired email verification token");
  }
  const user = await User.findOne({
    _id: decodedtoken._id,
    emailVerificationToken : verifytoken,
    emailVerificationExpires: { $gt: Date.now() },
  })
  if (!user) {
    return res.status(401).redirect(`${process.env.CLIENT_URL}/tokenexpire`)
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await sendWelcomeEmail(user)
  await user.save({ validateBeforeSave: false });

  return res.status(200).redirect(`${process.env.CLIENT_URL}/emailverified`)
})

const CheckverifyEmail = asyncHandler(async (req, res) => {
  const user = req?.user
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (user.isEmailVerified) {
    return res.status(200).json({ isEmailVerified: true });
  } else {
    return res.status(200).json({ isEmailVerified: false });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, emailId, userName, password } = req.body;
  if( [fullName,emailId,userName,password].some((field) => field?.trim() === "") ){
    throw new ApiError(400,"All fields are required")
}
  const existedUser = await User.findOne({
    $or: [{ emailId }, { userName }]
  });
  if (existedUser) {

    if (existedUser.emailId === emailId) {
      throw new ApiError(409, "Email already exists");
    }
    if (existedUser.userName === userName) {
      throw new ApiError(409, "Username already exists");
    }
  }
  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    emailId,
    password,
  })
  await sendVerificationEmail(user,req);
  
  const {accessToken,refreshToken} = await generateAcessandRefreshToken(user?._id);
  const options = {
    httpOnly: true,
    secure: true,
  }
  const createdUser = await User.findById(user?._id).select("-password -refreshToken")
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user");
  }
  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(200,{user:createdUser,accessToken,refreshToken},"User is register succesfully")
  )
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailId, password} = req.body;
  if(!emailId){
    throw new ApiError(400,"email is required")
  }
  const user = await User.findOne({
    $or: [{ emailId }]
  })
  if(!user){
    throw new ApiError(404,"User does not exist")
  }
  if (!user.isEmailVerified) {
    throw new ApiError(401, 'Please verify your email to log in');
  }
  const ispasswordvalid = await user.isPasswordCorrect(password);
  if(!ispasswordvalid){
    throw new ApiError(401,"Password is incorrect");
  }
  const {accessToken,refreshToken} = await generateAcessandRefreshToken(user?._id);
  const loogedinuser = await User.findById(user?._id).select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  }
  return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(200,{user:loogedinuser,accessToken,refreshToken},"user logged in successfully")
  )
})

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user?._id,{
    $unset:{
      refreshToken:1
    }
  },{new:true})

  const options = {
    httpOnly:true,
    secure:true
  }
  return res.status(200).clearCookie("accessToken",null,options).clearCookie("refreshToken",null,options).json(
    new ApiResponse(200,{},"User Logged out")
  )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshtoken = req.cookies.refreshToken || req.body.refreshToken;
  if(!incomingrefreshtoken){
    throw new ApiError(401,"Unauthorizes access");
  }
  try {
    const decodedtoken = jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedtoken?._id);
    if(!user){
      throw new ApiError(401,"Refresh Token is expired or used");
    }
    const options = {
      httpOnly:true,
      secure:true
    }
    const {accessToken,refreshToken} = await generateAcessandRefreshToken(user?._id);
    return res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
      new ApiResponse(200,{accessToken,refreshToken},"Access token refreshed")
    )
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Refresh token");
  }
})

const setDP = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if(!avatar){
    throw new ApiError(400,"Error on uploading avatar file");
  }
  const user = await User.findByIdAndUpdate(req.user?._id, { $set : { avatar : avatar.url }}, { new : true }).select("-password");
  return res.status(200).json(
    new ApiResponse(200,user,"Avatar set Successfully")
  )
})

const changecurrentpassword = asyncHandler(async (req, res) => {
  const { oldpassword , newpassword } = req.body;
  const user = await User.findById(req.user?._id);
  const ispasswordCorrect = await user.isPasswordCorrect(oldpassword);
  if(!ispasswordCorrect){
    throw new ApiError(400,"Invalid old password");
  }
  if(oldpassword != newpassword){
    user.password = newpassword;
    await user.save({ validateBeforeSave:false })
    return res.status(200).json(
      new ApiResponse(200,user,"Password Changes Successfully")
    )
  }else{
    throw new ApiError(400,"Old password and new password not same");
  }
})


const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, age, gender, about, interest, address } = req.body;

  // Ensure at least one field is being updated
  if (!fullName && !age && !gender && !about && !interest && !address) {
    throw new ApiError(400, "At least one field must be updated");
  }

  // Optional validation for specific fields
  if (about?.trim() === "" || gender?.trim() === "") {
    throw new ApiError(400, "Gender and about fields cannot be empty");
  }
  
  if (!age && age !== undefined) {
    throw new ApiError(400, "Age is required");
  }
  
  if (address && (!address.state || !address.city || !address.pincode)) {
    throw new ApiError(400, "Address, including state, city, and pincode, is required");
  }
  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (age) updateFields.age = age;
  if (gender) updateFields.gender = gender;
  if (about) updateFields.about = about;
  if (interest) updateFields.interest = interest;
  if (address) updateFields.address = address;

  const user = await User.findByIdAndUpdate(
    req.user?._id, 
    { $set: updateFields }, 
    { new: true }
  ).select("-password");

  user.isProfilesetup = true;
  await user.save({ validateBeforeSave: false })

  return res.status(200).json(
    new ApiResponse(200, user, "Account details updated successfully")
  );
});


const updatePhotoAtIndex = asyncHandler(async (req, res) => {
  const {index} = req.body;
  if(isNaN(index) || index < 0 || index >= 5){
    throw new ApiError(400, "Invalid index. Must be between 0 and 4.");
  }
  if (!req?.file) {
    throw new ApiError(400, "A new photo is required for update.");
  }
  const photo = await uploadOnCloudinary(req?.file?.path);
  if(!photo){
    throw new ApiError(400, "Failed to upload the new image.");
  }
  const user = await User.findByIdAndUpdate(req.user?._id, { $set: { [`photos.${index}`]: photo.url } }, {new:true})
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  return res.status(200).json(
    new ApiResponse(200, user, `Photo at index ${index} updated successfully`)
  );
})

const uploadPhoto = asyncHandler(async (req, res) => {
  const photoLocalPath = req.file?.path;
  if(!photoLocalPath){
    throw new ApiError(400, "Photo file is required.");
  }
  const photo = await uploadOnCloudinary(photoLocalPath);
  if (!photo) {
    throw new ApiError(400, "Error uploading the photo.");
  }
  const user = await User.findByIdAndUpdate(req.user?._id, { $set: { photos: photo.url } }, { new: true }).select("-password");
  return res.status(200).json(
    new ApiResponse(200, user, "Photo uploaded successfully")
  );
})

const myProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "My Profile")
  )
})

const getUserProfile = asyncHandler(async (req, res) => {
  const {id} = req.params;
  if(!id){
    throw new ApiError(400,"User id is required")
  }
  const user = await User.findById(id);
  if(!user){
    throw new ApiError(400,"User is not exist with that id")
  }
  const SelectUser = await User.findById(user?._id).select("-password -refreshToken -accessToken -isProfilesetup -createdAt -updatedAt -isEmailVerified -emailId")
  return res.status(200).json(
    new ApiResponse(200,SelectUser,"Current User")
  )
})

const getAlluser = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password -refreshToken");
  if(!user){
    throw new ApiError(400,"No User in Database")
  }
  const totaluser = await User.countDocuments();
  return res.status(200).json(
    new ApiResponse(200,user,"All User Fetch Successfully",totaluser)
  )
})

const accountDelete = asyncHandler(async (req, res) => {
  const {password} = req.body;
  if(!password){
    throw new ApiError(400, "Password is required to delete the account")
  }
  const user = await User.findById(req.user?._id);
  const ispasswordCorrect = await user.isPasswordCorrect(password);
  if(!ispasswordCorrect){
    throw new ApiError(400, "Password is wrong")
  }
  await user.deleteOne();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
    new ApiResponse(200,null,"Your account Deleted")
  )
})

const forgetPassword = asyncHandler(async (req, res) => {
  const {emailId} = req.body;
  if(!emailId){
    throw new ApiError(400, "Email id is required");
  }
  const user = await User.findOne({emailId});
  if(!user){
    throw new ApiError(404, "User with this email does not exist");
  }
  const resetToken = await user.createPasswordResetToken();
  await user.save({validateBeforeSave:false})

  // Send Email
  // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/reset-password/${resetToken}`;
  const resetURL = `${process.env.CLIENT_URL}/reset-password/${user?._id}/${resetToken}`;
  // Read the HTML template
  try {
    const templatePath = path.join(__dirname, 'Template', 'forgetPassword.html');
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');
    htmlContent = htmlContent.replace('{{fullName}}', user.fullName).replace('{{resetURL}}', resetURL);
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: user.emailId,
      subject: 'Password Reset',
      html: htmlContent
    };
    transporter.sendMail(mailOptions, (error,info) => {
      if(error){
        throw new ApiError(500, "Error While sending the email");
      }
      res.status(200).json(
        new ApiResponse(200, {}, `We send the link to your email ${user.emailId} to reset the password. Go and check your email`)
      )
    })
  } catch (error) {
  throw new ApiError(500, "Error while sending the email");
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const {id} = req.params
  const resetToken = req.params.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET); 
  } catch (error) {
    throw new ApiError(401, "Invalid or expired reset token");
  }
  if (decodedToken._id !== id) {
    throw new ApiError(400, "User ID does not match the token");
  }
  const {newpassword} = req.body;
  if(!newpassword){
    throw new ApiError(400, "New password is required");
  }
  const user = await User.findOne({
    _id: decodedToken._id,
  })
  if(!user){
    throw new ApiError(400, "Invalid or expired reset token");
  }
  user.password = newpassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save({ validateBeforeSave: false });
  await sendResetPasswordEmail(user)
  return res.status(200).json(
    new ApiResponse(200, {}, "Password reset successfully")
  )
})



export {registerUser, loginUser, logoutUser, refreshAccessToken, setDP, changecurrentpassword, updateAccountDetails, uploadPhoto, updatePhotoAtIndex, myProfile, getAlluser, accountDelete, forgetPassword, resetPassword, verifyEmail, googleAuthCallback, sendWelcomeEmail,CheckverifyEmail,generateAcessandRefreshToken, getUserProfile}