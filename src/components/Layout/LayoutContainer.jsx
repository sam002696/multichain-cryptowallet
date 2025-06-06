import React from "react";

const LayoutContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center deep-black text-white">
      <div className="w-full max-w-xl-custom  p-4 black-bg rounded-2xl shadow-lg border-all border">
        {children}
      </div>
    </div>
  );
};

export default LayoutContainer;
