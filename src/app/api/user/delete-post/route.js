import { connectToMongoDB } from "@/dataBase";
import AuthUser from "@/middleware/AuthUser";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  console.log("Delete req came");
  await connectToMongoDB();
  const isUserAuth = await AuthUser(req);
  console.log(isUserAuth);
  if (isUserAuth) {
    const { searchParams } = new URL(req.url);
    const postID = searchParams.get("postId");
    console.log(postID);
    if (!postID) {
      console.log("Id is required");
      return NextResponse.json({
        success: false,
        message: "Id is required",
      });
    }

    const deletePostFromDB = await Post.findByIdAndDelete(postID);
    if (deletePostFromDB) {
      console.log("Post deleted");
      return NextResponse.json({
        success: true,
        message: "Post successfully deleted.",
      });
    } else {
      console.log("Error on deleting");
      return NextResponse.json({
        success: false,
        message: "Error deleting post on DB.",
      });
    }
  } else {
    console.log("user is not authenticated");
    return NextResponse.json({
      success: false,
      message: "You are not authenticated. Login again.",
    });
  }
}
