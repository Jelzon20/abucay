import React from "react";
import { Outlet } from "react-router-dom";

const ServicesTab = () => {
  return (
    <div>
      {/* Render child route content */}
      <Outlet />
    </div>
  );
};

export default ServicesTab;
