import { connectToMongoDB } from "@/dataBase";
import AuthUser from "@/middleware/AuthUser";
import UserDetail from "@/models/userDetail";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  profileImg: Joi.string().required(),
  profileDetails: Joi.string().required(),
  userID: Joi.string().required(),
});

export async function POST(req) {
  console.log("post user details req came");
  await connectToMongoDB();

  const userAuth = await AuthUser(req);

  if (userAuth) {
    const { profileImg, profileDetails, userID } = await req.json();
    console.log(profileImg, profileDetails, userID);
    const { error } = schema.validate({
      profileImg,
      profileDetails,
      userID,
    });
    if (error) {
      console.log("error on validationg data");
      return NextResponse.json({
        success: false,
        message: "Error on validating request form data.",
      });
    }
    const createUserData = await UserDetail.create({
      userID: userID,
      userDetails: profileDetails,
      userImage: profileImg,
    });

    if (createUserData) {
      console.log("user data is created");
      return NextResponse.json({
        success: true,
        message: "Your details has been added.",
      });
    } else {
      console.log("error on creating db error");
      return NextResponse.json({
        success: false,
        message: "Data base error! Try later",
      });
    }
  } else {
    console.log("user is not authenticated");
    return NextResponse.json({
      success: false,
      message: "User is not authenticated. Login and try again",
    });
  }
}
