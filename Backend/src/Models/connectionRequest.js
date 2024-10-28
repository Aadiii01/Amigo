import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pass", "like", "accept", "reject"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", async function (next) {
  const connectionRequest = this;
  if (connectionRequest.requester.equals(connectionRequest.recipient)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

export const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);