import React from "react";

const Header = () => {
  return (
    <header
      className="absolute top-0 left-0 w-full bg-opacity-30 text-white p-4 flex justify-between items-center"
      style={{ zIndex: 100 }}
    >
      <h1 className="text-2xl text-white">Mental Bloom</h1>
      <div>
        <a
          href="http://localhost:3000/register"
          className="text-xl text-white hover:text-green-400 mx-4"
        >
          Register
        </a>
        <a
          href="http://localhost:3000/login"
          className="text-xl text-white hover:text-green-400"
        >
          Sign In
        </a>
      </div>
    </header>
  );
};

export default Header;
