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
    <div className="w-full h-100v flex flex-col space-y-6 items-center justify-center">
      <h1 className="text-6xl font-helvetica">Helvetica font Test</h1>
      <h1 className="font-Arial text-6xl">Arial font Test</h1>
    </div>
  );
};

export default page;
