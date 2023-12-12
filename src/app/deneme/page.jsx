"use client";

import React, { useState } from "react";

const page = () => {
  const slides = [
    "https://placekitten.com/800/400",
    "https://placekitten.com/801/400",
    "https://placekitten.com/802/400",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`w-full transition-transform transform ${
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Your slide content goes here */}
              <img src={slide} alt={`Slide ${index + 1}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default page;
