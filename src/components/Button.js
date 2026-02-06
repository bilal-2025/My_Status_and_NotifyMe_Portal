import React, { useState } from 'react';        // not-optimized

const Button = ({ text, onClick, isActive }) => {

  return (
    <button className={`border text-white px-5 py-2 rounded w-48 mb-3 hover:bg-white-500 transition-bg duration-200 hover:border-white hover:text-black hover:bg-white active:bg-gray-400 ${isActive?'btnActive':''}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;