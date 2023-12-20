"use server";

import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    const connectionUrl = process.env.Mongo_URL;
    console.log(connectionUrl);

    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB server");
  } catch (err) {
    console.error("Error when connecting to db", err);
  }
};
