"use client";
import React from "react";
import { useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Home = () => {
  const Loader = useSelector((state) => state.blog.componentLevelLoader);
  const Repeat = useSelector((state) => state.blog.repeatItems);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start mt-4">
      <div className="w-11/12 h-65v items-center justify-center relative bg-red-400 group rounded-xl overflow-hidden cursor-pointer">
        <img
          src="https://assets-global.website-files.com/6467d96400e84f307e2196ef/6467d96400e84f307e21a8d7_Best%20Photography%20Blogs%20-%20Wrapbook%20-%20We%20Eat%20Together.jpeg"
          alt=""
          className="w-full h-full group-hover:scale-110 ease-in-out duration-300 object-cover object-center "
        />
        <div className="absolute left-[4%] bottom-[10%] flex flex-col items-start justify-start md:space-y-4 group-hover:-translate-x-2 ease-in-out duration-300 z-10">
          <p className="text-lg text-white">Feautered</p>
          <h1 className="max-w-4xl text-4xl font-medium text-white">
            Breaking Into product design: Advice from untitled founder frankie
          </h1>
          <p className="text-white text-sm max-w-6xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sunt
            minima molestias, dolor magni aliquam expedita ab in iste
            exercitationem id architecto tenetur totam maiores aspernatur
            ratione fugit quidem quae.
          </p>
        </div>
        {/* <div className="w-1/12 h-full absolute right-0 top-0 bg-gradient-to-r from-slate-50/20 to-slate-800/40 shadow-2xl"></div> */}
        <div className="absolute right-4 bottom-1/2 group-hover:-translate-x-8  scale-125  group-hover:scale-150 transition-all ease-in-out duration-300 z-10">
          <ArrowForwardIcon className="text-white" />
        </div>
      </div>
      <div className="w-full h-auto flex flex-col items-center justify-start md:mt-8">
        <h1 className="text-2xl font-semibold text-neutral-900 w-9/12 px-6">
          Recent blog posts
        </h1>
        <div className="w-9/12 h-auto p-6 grid grid-cols-3 gap-3  mt-4">
          {Repeat.map((item, index) => (
            <div
              className="w-3/4 h-45v flex flex-col items-start justify-start space-y-2 hover:shadow-lg shadow-gray-400 ease-in-out duration-300 rounded-xl cursor-pointer "
              key={index}
            >
              <img
                src="https://assets-global.website-files.com/6467d96400e84f307e2196ef/6467d96400e84f307e21a8d7_Best%20Photography%20Blogs%20-%20Wrapbook%20-%20We%20Eat%20Together.jpeg"
                alt=""
                className="w-full h-25v rounded-2xl p-1"
              />
              <div className="w-full h-20v flex flex-col items-start justify-start p-1 space-y-6 ">
                <h1 className="text-3xl text-semibold text-neutral-900 px-1">
                  Linear 101
                </h1>
                <p className="text-sm px-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab,
                  corrupti!
                </p>
                <div className="flex items-center justify-center md:space-x-3 px-1">
                  <img
                    src="https://imgs.search.brave.com/BbT4YBOEdGKbwvMFyV7Qg37YCw7HDRNLEaLepM1KdxE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9z/bWlsaW5nLWNhdWNh/c2lhbi1ndXktd2l0/aC1iZWFyZC1sb29r/aW5nLWhhcHB5XzE3/NjQyMC0xODcwNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
                    alt=""
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <p className="text-lg">
                    Eve Wilkins <i className="text-4xl">.</i> 19 Jan 2023
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
