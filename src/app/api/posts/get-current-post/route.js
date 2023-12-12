import { connectToMongoDB } from "@/dataBase";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("current product req came");
  await connectToMongoDB();

  const { searchParams } = new URL(req.url);
  const postID = searchParams.get("id");

  if (!postID) {
    console.log("bad request");
    return NextResponse.json({
      success: false,
      message: "Bad requst!",
    });
  }
  const postByID = await Post.find({ _id: postID });
  if (postByID) {
    console.log("post found");
    return NextResponse.json({
      success: true,
      data: postByID[0],
    });
  } else {
    console.log("Post not exist.");
    return NextResponse.json({
      success: false,
      message: "Post not exist.",
    });
  }
}
