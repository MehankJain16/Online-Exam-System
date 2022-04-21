import React from "react";
import { Link } from "react-router-dom";

const SideNavItem = ({ title, to, active }) => {
  return (
    <Link
      to={to}
      className={`text-white80 text-lg font-semibold block p-2 rounded-md w-full ${
        active ? "bg-primary" : "bg-transparent"
      }`}>
      {title}
    </Link>
  );
};

export default SideNavItem;
