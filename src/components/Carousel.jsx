"use client";
// Carousel.js
import React, { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Carousel = ({ slides, currentSlide }) => {
  // No need to manage local state in the Carousel component

  // Other code...

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden w-full h-full">
        <div className="flex w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full h-full transition-transform transform ${
                index === currentSlide
                  ? "translate-x-0 block"
                  : "translate-x-full hidden"
              }`}
            >
              {/* Your slide content goes here */}
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-center object-cover duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Remove the navigation buttons from the Carousel component */}
    </div>
  );
};

export default Carousel;
