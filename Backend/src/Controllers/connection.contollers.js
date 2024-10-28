import asyncHandler from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../Models/user.models.js";
import { ConnectionRequest } from "../Models/connectionRequest.js";

const SAFE = ["userName","fullName","emailId","age","about","interest","gender","address","avatar","photos"];

const sendRequest = asyncHandler(async (req, res) => {
  const requester = req.user._id;
  const recipient = req.params.recipient;
  const status = req.params.status;

  const allowedStatus = ["pass", "like"];
  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Status must be either pass or like");
  }
  const recipientUser = await User.findById(recipient);
  if (!recipientUser) {
    throw new ApiError(404, "User does not exist");
  }

  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or: [
      { requester, recipient },
      { requester: recipient, recipient: requester },
    ],
  });
  if (existingConnectionRequest) {
    throw new ApiError(400, "Connection Request Already Exists!!");
  }

  const connectionRequest = await ConnectionRequest.create({
    requester,
    recipient,
    status,
  });

  const data = await ConnectionRequest.findById(connectionRequest._id).populate("recipient", SAFE);
  return res.status(200).json(
      new ApiResponse(200,data,`${req.user.fullName} is ${status} ${recipientUser.fullName}`)
    );
});

const reviewRequest = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { status, requestId } = req.params;
  const allowedStatus = ["accept", "reject"];
  if(!allowedStatus.includes(status)){
    throw new ApiError(400, "Status must be either accept or reject")
  }
  const connectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    recipient: loggedInUser._id,
    status: "like"
  }).populate("requester", SAFE)
  if(!connectionRequest){
    throw new ApiError(400, "Connection request not found")
  }
  connectionRequest.status = status;
  await connectionRequest.save({validateBeforeSave:false});
  return res.status(200).json(
    new ApiResponse(200,connectionRequest,`${loggedInUser.fullName} has ${status}ed the request`)
  )
})

const allPendingRequest = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequest = await ConnectionRequest.find({
    recipient: loggedInUser._id,
    status: "like",
  }).populate("requester", SAFE)
  if(!connectionRequest){
    throw new ApiError(400, "Connection request not found")
  }
  // Add New
  const validRequests = connectionRequest.filter(request => request.requester !== null);
  // 
  const totalRequest = validRequests.length;
  if(totalRequest === 0){
    return res.status(200).json(
      new ApiResponse(200, totalRequest,`${loggedInUser.fullName} you have ${totalRequest} pending request`)
    );
  }
  return res.status(200).json(
    new ApiResponse(200,validRequests,`${loggedInUser.fullName} you have ${totalRequest} pending request`,totalRequest)
  )
})

const myConnection = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const connectionRequest = await ConnectionRequest.find({
    $or: [
      {recipient: loggedInUser._id, status: "accept"},
      {requester: loggedInUser._id, status: "accept"}
    ]
  }).populate("requester", SAFE).populate("recipient", SAFE);
  if(!connectionRequest){
    throw new ApiError(400, "Connection request not found")
  }
  // Add New
  const validConnections = connectionRequest.filter(row => 
    row.requester !== null && row.recipient !== null &&
    !row.requester.deleted && 
    !row.recipient.deleted 
  );
  // 
  const totalRequest = validConnections.length;
  if(totalRequest === 0){
    return res.status(200).json(
      new ApiResponse(200, totalRequest,`${loggedInUser.fullName} you have ${totalRequest} connection`)
    );
  }
  const data = validConnections.map((row) => {
    if(row.requester._id.equals(loggedInUser._id)){
        return row.recipient;
    }
    return row.requester;
  })
  return res.status(200).json(
    new ApiResponse(200,data,`${loggedInUser.fullName} you have ${totalRequest} connection`,totalRequest)
  )
})

const unfriendConnection = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const { connectionId } = req.params
  const connectionRequest = await ConnectionRequest.findOne({
    $or: [
      { requester: loggedInUser._id, recipient: connectionId, status: "accept"},
      { recipient: loggedInUser._id, requester: connectionId, status: "accept"}
    ]
  })
  if(!connectionRequest){
    throw new ApiError(404, "Connection not found or already removed.");
  }
  await connectionRequest.deleteOne();
  return res.status(200).json(
    new ApiResponse(200, null, "Connection removed successfully.")
  );
})

const mutualConnections = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const targetUserId = req.params.userId;

  // Check if target user exists
  const targetUser = await User.findById(targetUserId);
  if (!targetUser) {
    throw new ApiError(404, "Target user not found");
  }
  // Find connections for the logged-in user
  const loggedInUserConnections = await ConnectionRequest.find({
    $or: [
      { requester: loggedInUser._id, status: "accept"},
      { recipient: loggedInUser._id, status: "accept"}
    ]
  }).select("requester recipient");

  // Find connections for the target user
  const targetUserConnections = await ConnectionRequest.find({
    $or: [
      { requester: targetUserId, status: "accept" },
      { recipient: targetUserId, status: "accept" }
    ]
  }).select("requester recipient");

  // Extracting user IDs from the connections
  const loggedInUserIds = loggedInUserConnections.map(row => 
    row.requester.equals(loggedInUser._id) ? row.recipient : row.requester
  )
  const targetUserIds = targetUserConnections.map(row =>
    row.requester.equals(targetUserId) ? row.recipient : row.requester
  );

  // Find mutual connections by intersecting the two arrays
  const mutualIds = loggedInUserIds.filter(loggedInId =>
    targetUserIds.some(targetId => targetId.equals(loggedInId))
  );
  
  if(mutualIds.length === 0){
    return res.status(200).json(
      new ApiResponse(200, [], `${loggedInUser.fullName} you have no mutual connections with ${targetUser.fullName}.`,{ totalMutualConnections: 0})
    );
  }
  // Fetch the user details for mutual connections
  const mutualConnections = await User.find({ _id: { $in: mutualIds } }).select(SAFE)
  return res.status(200).json(
    new ApiResponse(200, mutualConnections, `${loggedInUser.fullName} has ${mutualIds.length} mutual connections with ${targetUser.fullName}.`,{totalMutualConnections: mutualIds.length})
  );
})

const searchUser = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const {query} = req.query;
  const page = parseInt(req.query.page) || 1; // Pagination - default page 1
  let limit = parseInt(req.query.limit) || 10; // Limit per page - default 10
  limit = limit > 50 ? 50 : limit;

  // Search criteria based on the query
  const searchCriteria = query ? {
    $or: [
      { userName: { $regex: query, $options: "i" } },
      { fullName: { $regex: query, $options: "i" } },
      { interest: { $regex: query, $options: "i" } }
    ]
  }: {};

  const users = await User.find({
    ...searchCriteria,
    _id: { $ne: loggedInUser._id }
  }).select(SAFE).skip((page - 1) * limit).limit(limit);

  const totalUser = await User.countDocuments({
    ...searchCriteria,
    _id: { $ne: loggedInUser._id }
  });

  return res.status(200).json(
    new ApiResponse(200, users, `Search results for "${query}"`, {
      totalUser,
      currentPage: page,
      totalPages: Math.ceil(totalUser / limit)
    })
  );
})

const feedUser = asyncHandler(async (req, res) => {
  const loggedInUser = req.user;
  const page = parseInt(req.query.page) || 1; // Pagination - default page 1
  let limit = parseInt(req.query.limit) || 10; // Limit per page - default 10
  limit = limit > 50 ? 50 : limit;

  const connectionRequest = await ConnectionRequest.find({
    $or: [
      { requester: loggedInUser._id },
      { recipient: loggedInUser._id }
    ]
  }).select("requester recipient");

  const hideUserFromFeed = new Set();
  connectionRequest.forEach((req) => {
    hideUserFromFeed.add(req.requester.toString());
    hideUserFromFeed.add(req.recipient.toString());
  })

  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUserFromFeed) } },
      { _id: { $ne: loggedInUser._id }}
    ]
  }).select(SAFE).skip((page - 1)* limit).limit(limit)

  const totalUser = await User.countDocuments({
    $and: [
      { _id: { $nin: Array.from(hideUserFromFeed) } },
      { _id: { $ne: loggedInUser._id }}
    ]
  })

  return res.status(200).json(
    new ApiResponse(200,users,`${loggedInUser.fullName} here are users for you.`,{
      totalUser,
      currentPage: page,
      totalPages: Math.ceil(totalUser / limit)
    })
  );
})

export { sendRequest, reviewRequest, allPendingRequest, myConnection, unfriendConnection, searchUser, mutualConnections, feedUser };
