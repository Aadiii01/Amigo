import { Router } from "express";
import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js"
import { registerUser, loginUser, logoutUser, refreshAccessToken, setDP, changecurrentpassword, updateAccountDetails, uploadPhoto, updatePhotoAtIndex, myProfile, getAlluser, accountDelete, forgetPassword, resetPassword, verifyEmail, googleAuthCallback, CheckverifyEmail,generateAcessandRefreshToken, getUserProfile } from "../Controllers/user.controllers.js";
import { User } from "../Models/user.models.js";
import passport from "passport";
import { ApiError } from "../Utils/ApiError.js";

const router = Router();

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/avatar").post(verifyJWT,upload.single("avatar"),setDP);
router.route("/change-password").post(verifyJWT , changecurrentpassword);
router.route("/update-account").put(verifyJWT, updateAccountDetails);
router.route("/upload-photos").put(verifyJWT ,upload.single("photos"), uploadPhoto)
// router.route("/update-photo").put(verifyJWT, upload.single("photos"), updatePhotoAtIndex);
router.route("/profile").get(verifyJWT,myProfile)
router.route("/userProfile/:id").get(verifyJWT,getUserProfile)
// router.route("/alluser").get(getAlluser)
router.route("/deleteprofile").delete(verifyJWT,accountDelete)
router.route("/forgot-password").post(forgetPassword);
router.route("/reset-password/:id/:token").put(resetPassword);
router.route("/verify-email/:token").get(verifyEmail)
router.route("/check-email-verification").get(verifyJWT,CheckverifyEmail)

  

export default router;