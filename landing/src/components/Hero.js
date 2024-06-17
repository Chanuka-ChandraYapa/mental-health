import React from "react";

const Hero = () => {
  return (
    <section
      className="hero min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('/hero-image.jpeg')",
        position: "relative",
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="absolute inset-0 bg-black opacity-80"
        style={{ zIndex: 2 }}
      ></div>
      <div
        className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center relative"
        style={{ zIndex: 3 }}
      >
        <h1 className="text-8xl font-bold text-white mb-4">
          Take care of your mind
        </h1>
        <p className="text-4xl text-green-400 mb-8">
          We offer personalized mental healthcare to help you thrive.
        </p>
        <a
          href="#"
          className="bg-gradient-to-r from-green-200 to-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-green-500/50"
          style={{
            boxShadow: "0 0 15px rgba(0, 255, 0, 0.7)",
          }}
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
