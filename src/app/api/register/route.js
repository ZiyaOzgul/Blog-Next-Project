"use server";
import { connectToMongoDB } from "@/dataBase";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
  userName: Joi.string().required(),
  userMail: Joi.string().email().required(),
  userPassword: Joi.string().required(),
});

export async function POST(req) {
  console.log("register req came");
  await connectToMongoDB();
  const { userName, userMail, userPassword } = await req.json();
  console.log(userName, userMail, userPassword);
  const { error } = schema.validate({ userName, userMail, userPassword });
  if (error) {
    console.log("error on register validation");
    return NextResponse.json({
      success: false,
      message: "Error on validation at request",
    });
  }

  const isUserExist = await User.findOne({ email: userMail });
  if (isUserExist) {
    console.log(isUserExist);
    console.log("user is exist");
    return NextResponse.json({
      success: false,
      message: "User is alredy exist! Try different mail adress.",
    });
  } else {
    const hashedPassword = await hash(userPassword, 12);
    const createNewUser = await User.create({
      name: userName,
      email: userMail,
      password: hashedPassword,
    });
    if (createNewUser) {
      console.log("new user created");
      return NextResponse.json({
        success: true,
        message: "New user created.",
      });
    } else {
      console.log("error on creating new user");
      return NextResponse.json({
        success: false,
        message: "error on creating new user",
      });
    }
  }
}
