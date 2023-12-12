import { connectToMongoDB } from "@/dataBase";
import User from "@/models/user";
import { compare, hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const schema = Joi.object({
  userMail: Joi.string().required(),
  userPassword: Joi.string().required(),
});

export async function POST(req) {
  console.log("login req came");
  await connectToMongoDB();

  const { userMail, userPassword } = await req.json();
  console.log(userMail, userPassword);
  const { error } = schema.validate({ userMail, userPassword });
  if (error) {
    console.log("error on validation request data");
    return NextResponse.json({
      success: false,
      message: "Error on request data validation!",
    });
  }

  const validateUser = await User.findOne({ email: userMail });
  if (!validateUser) {
    console.log("User is not exist");
    return NextResponse.json({
      success: false,
      message: "User is not exist! Try correct mail adress.",
    });
  } else {
    const hashPassword = await hash(userPassword, 12);
    const checkPassword = await compare(hashPassword, validateUser.password);
    console.log(checkPassword);
    if (checkPassword) {
      console.log("password is not correct");
      return NextResponse.json({
        success: false,
        message: "Invalid email or password! Try again.",
      });
    }
    const token = jwt.sign(
      {
        id: validateUser._id,
        name: validateUser.name,
        email: validateUser.email,
        role: validateUser.role,
      },
      "default_secret_key",
      { expiresIn: 1200 }
    );
    const finalResult = {
      token,
      user: {
        id: validateUser._id,
        name: validateUser.name,
        email: validateUser.email,
        role: validateUser.role,
      },
    };
    console.log(finalResult);
    return NextResponse.json({
      success: true,
      message: "Login successfull !",
      data: finalResult,
    });
  }
}
