"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full h-auto flex  justify-center">
      <div className="w-9/12 h-50v p-4 ">
        <div className="w-full h-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-start">
          <h1 className="text-2xl font-semibold text-white mt-10">
            Let's get started something !
          </h1>
          <p className="text-white text-sm mt-4">Join my startup project</p>
          <div className="w-full h-auto flex flex-col items-center justify-between mt-4 md:mt-6">
            <div className="w-full h-auto flex items-start justify-start">
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
              </div>
              <div className="w-1/4 h-auto flex flex-col items-center justify-start space-y-4">
                <h1 className="text-lg text-white font-bold">Social</h1>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
                <p className="text-white text-sm">Twitter</p>
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
