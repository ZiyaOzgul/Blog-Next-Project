"use client";

import Link from "next/link";
import React from "react";
import { UilGithub, UilLinkedin, UilGlobe } from "@iconscout/react-unicons";

const Footer = () => {
  return (
    <div className="w-full h-auto flex  justify-center">
      <div className="w-9/12 h-50v p-4 ">
        <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-start">
          <h1 className="text-2xl font-semibold text-white mt-10">
            Let's get started something !
          </h1>
          <p className="text-white text-sm mt-4">Join my blog project</p>
          <div className="w-full h-auto flex flex-col items-center justify-between mt-4 md:mt-6">
            <div className="w-full h-15v flex items-start justify-start">
              {/* <div className="w-1/4 h-auto flex flex-col items-center justify-start space-y-4">
                <h1 className="text-lg text-white font-bold">Social</h1>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
              </div>
              <div className="w-1/4 h-auto flex flex-col items-center justify-start space-y-4">
                <h1 className="text-lg text-white font-bold">Social</h1>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
              </div>
              <div className="w-1/4 h-auto flex flex-col items-center justify-start space-y-4">
                <h1 className="text-lg text-white font-bold">Social</h1>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
              </div>
              <div className="w-1/4 h-auto flex flex-col items-center justify-start space-y-4">
                <h1 className="text-lg text-white font-bold">Social</h1>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
              </div> */}
              <div className="w-1/3 h-full  flex  items-center justify-center ">
                <a
                  href="https://github.com/ZiyaOzgul"
                  target="_blank"
                  className="w-auto h-auto flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <UilGithub className="w-10 h-10 text-purple-400 group-hover:text-purple-600 ease-in-out duration-300" />
                  <p className="text-white text-base group-hover:translate-x-2 group-hover:text-purple-500 transition-all ease-in-out duration-300 ">
                    GitHub
                  </p>
                </a>
              </div>
              <div className="w-1/3 h-full  flex items-center justify-center ">
                <a
                  href="https://www.linkedin.com/in/ziya-%C3%B6zg%C3%BCl-93816a260/"
                  target="_blank"
                  className="w-auto h-auto flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <UilLinkedin className="w-10 h-10 text-purple-400 group-hover:text-purple-600 ease-in-out duration-300" />
                  <p className="text-white text-base group-hover:translate-x-2 group-hover:text-purple-500 transition-all ease-in-out duration-300 ">
                    LinkedIn
                  </p>
                </a>
              </div>
              <div className="w-1/3 h-full  flex  items-center justify-center ">
                <a
                  href="https://portfolio-ziya.netlify.app/"
                  target="_blank"
                  className="w-auto h-auto flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <UilGlobe className="w-10 h-10 text-purple-400 group-hover:text-purple-600 ease-in-out duration-300" />
                  <p className="text-white text-base group-hover:translate-x-2 group-hover:text-purple-500 transition-all ease-in-out duration-300 ">
                    Personal Website
                  </p>
                </a>
              </div>
            </div>
            <div className="w-full flex items-end justify-between mt-4 md:mt-6 p-6">
              <div className=" flex flex-col items-center justify-start">
                <i className="font-extrabold text-4xl text-white">
                  <i className="text-5xl text-purple-600">Ziya's </i>
                  Blog
                </i>
                <p className="font-medium text-white">
                  Write Your <i className="text-xl text-purple-500">Code!</i>
                </p>
              </div>
              <p className="text-white">
                ©2023 ZiyaÖzgül. All rights reserved.{"  "}
                <Link
                  className="hover:text-purple-600 ease-in-out duration-300"
                  href={"/privacy-policy"}
                >
                  Privacy Policy
                </Link>
                {","}
                <Link
                  className="hover:text-purple-600 ease-in-out duration-300"
                  href={"/terms-of-use"}
                >
                  Terms of Use
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
