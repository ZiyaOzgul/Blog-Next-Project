import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
