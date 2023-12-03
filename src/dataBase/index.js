"use server";

import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const connectToMongoDB = async () => {
  const connectionUrl = process.env.Mongo_URL;
  console.log(connectionUrl);
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => {
      console.log("Connected to Mongodb server");
    })
    .catch((err) => console.log("Error when connecting to db", err));
};
