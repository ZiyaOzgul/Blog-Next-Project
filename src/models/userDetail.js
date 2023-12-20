import mongoose from "mongoose";

const UserDetailSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userDetails: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
});

const UserDetail =
  mongoose.models.UserDetail || mongoose.model("UserDetail", UserDetailSchema);

export default UserDetail;
