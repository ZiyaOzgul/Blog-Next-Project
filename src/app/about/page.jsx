"use client";
import VideoCard from "@/components/VideoCard";
import React from "react";

const page = () => {
  const videoSource = "/assets/aboutBg.mp4";
  return (
    <div className="w-full h-100v flex items-center justify-center">
      <div className="w-10/12 h-full flex items-start justify-start space-x-4 p-6 mt-20">
        <video
          src={videoSource}
          muted
          loop
          autoPlay
          className=" w-1/2 h-4/5 -z-20 rounded-xl object-cover  "
        ></video>
        <div className="w-1/2 flex flex-col items-start justify-start space-y-4">
          <h1 className="font-semibold text-2xl text-neutral-900">About Me</h1>
          <h3 className="text-lg font-arial text-neutral-800">
            Jr. frontend developer and learning backend. 4th year student in
            Erciyes University at Computer Engineering. Skilled in
            problem-solving and executing software tasks from start to finish.
            Able to effectively self-manage during independent projects. And
            wants to collaborate as part of a productive team.
          </h3>
          <div className="flex items-center justify-start w-full ">
            <p className="text-xl text-neutral-900">Web Dev Skills: </p>
            <p className="text-lg text-neutral-800 font-Arial">
              JavaScript, React, NextJs, TailwindCSS, Redux, Express
            </p>
          </div>
          <div className="w-full flex items-center justify-start">
            <p className="text-xl text-neutral-900">Backend and Database: </p>
            <p className="text-lg text-neutral-800 font-Arial">
              NodeJs, MongoDB, Firebase, Msql
            </p>
          </div>
          <div className="w-full flex items-center justify-start">
            <p className="text-xl text-neutral-900">Mobile Development: </p>
            <p className="text-lg text-neutral-800 font-Arial">
              React Native, FireStore,
            </p>
          </div>
          <div className="w-full flex items-center justify-start">
            <p className="text-xl text-neutral-900">Software and Others: </p>
            <p className="text-lg text-neutral-800 font-Arial"> Git, Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
