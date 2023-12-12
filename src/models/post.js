import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    creatorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creatorName: {
      type: String,
      required: true,
    },

    postTitle: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
    postDetail: {
      type: String,
      required: true,
    },
    postImg: {
      type: [String],
      required: true,
    },
    postLike: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
