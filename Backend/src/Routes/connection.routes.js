import { Router } from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js"
import { sendRequest, reviewRequest, allPendingRequest, myConnection, feedUser, unfriendConnection, searchUser, mutualConnections } from "../Controllers/connection.contollers.js";

const router = Router();

router.route("/request/send/:status/:recipient").post(verifyJWT,sendRequest);
router.route("/request/review/:status/:requestId").post(verifyJWT,reviewRequest);
router.route("/request/received").get(verifyJWT,allPendingRequest)
router.route("/request/myConnection").get(verifyJWT,myConnection)
router.route("/request/unfriend/:connectionId").delete(verifyJWT,unfriendConnection)
router.route("/request/mutual/:userId").get(verifyJWT,mutualConnections)
router.route("/user/search").get(verifyJWT,searchUser)
router.route("/feedUser").get(verifyJWT,feedUser)

export default router