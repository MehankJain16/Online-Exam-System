import React from "react";

const Input = ({
  placeholder,
  type,
  val,
  setVal,
  bg = "bg-primary",
  disabled = false,
  onChange = (e) => setVal(e.target.value),
}) => {
  return (
    <input
      className={`p-2 h-10 border-none outline-none rounded-md text-white font-medium ${bg}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={val}
      disabled={disabled}
    />
  );
};

export default Input;
