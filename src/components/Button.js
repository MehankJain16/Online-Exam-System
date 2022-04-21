import React from "react";

const Button = ({ title, onClick, disabled = false }) => {
  return (
    <button
      className="h-10 bg-primaryDark border-none outline-none rounded-md text-white font-bold"
      onClick={onClick}
      disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
