import { connectToMongoDB } from "@/dataBase";
import AuthUser from "@/middleware/AuthUser";
import Post from "@/models/post";
import UserDetail from "@/models/userDetail";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToMongoDB();
  const isAuth = await AuthUser(req);
  if (isAuth) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("id");
    console.log(userID);
    const userDetails = await UserDetail.find({ userID: userID });
    if (userDetails) {
      console.log(userDetails);
      console.log("users all posts came");
      return NextResponse.json({
        success: true,
        data: userDetails[0],
      });
    } else {
      console.log("Error getting data on DB");
      return NextResponse.json({
        success: false,
        message: "Error getting user's posts  on db",
      });
    }
  } else {
    console.log("user is not authenticated");
    return NextResponse.json({
      success: false,
      message: "user not auth",
    });
  }
}
