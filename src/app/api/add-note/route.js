import { connectToMongoDB } from "@/dataBase";
import AuthUser from "@/middleware/AuthUser";
import Post from "@/models/post";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  entryTitle: Joi.string().required(),
  entryDesc: Joi.string().required(),
  entryDetail: Joi.string().required(),
  entryImg: Joi.array().required(),
  userID: Joi.string().required(),
});

export async function POST(req) {
  console.log("add post req came");
  await connectToMongoDB();
  const isUserAuth = await AuthUser(req);
  console.log(isUserAuth);
  if (isUserAuth) {
    const { entryTitle, entryDesc, entryDetail, entryImg, userID } =
      await req.json();
    console.log(userID);
    const { error } = schema.validate({
      entryTitle,
      entryDesc,
      entryDetail,
      entryImg,
      userID,
    });

    if (error) {
      console.log("error on validation data", error);
      return NextResponse.json({
        success: false,
        message: "Error on validating form data",
      });
    }
    const createPost = Post.create({
      creatorID: userID,
      creatorName: isUserAuth.name,
      postTitle: entryTitle,
      postDescription: entryDesc,
      postDetail: entryDetail,
      postImg: entryImg,
    });
    if (createPost) {
      console.log("Post added");
      return NextResponse.json({
        success: true,
        message: "New post created",
      });
    } else {
      console.log("error creating post");
      return NextResponse.json({
        success: false,
        message: "Error on creating new post",
      });
    }
  } else {
    console.log("user is not auth ");
    return NextResponse.json({
      success: false,
      message: "User is not autenticated",
    });
  }
}
