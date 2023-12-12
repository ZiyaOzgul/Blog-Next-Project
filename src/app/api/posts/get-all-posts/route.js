import { connectToMongoDB } from "@/dataBase";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("get all posts req came");
  await connectToMongoDB();

  const allPosts = await Post.find({});
  if (allPosts) {
    console.log("all posts get");
    return NextResponse.json({
      success: true,
      data: allPosts,
    });
  } else {
    console.log("error on getting posts");
    return NextResponse.json({
      success: false,
      message: "Error on getting data",
    });
  }
}
