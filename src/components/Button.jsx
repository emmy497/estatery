import React, { Children } from "react";

const Button = ({ style, bgColor, children }) => {
  return (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className={`p-4 flex items-center text-center boredr-[4px]  
        rounded-md cursor-pointer  ${style}`}
    >
      <p className=""> {children}</p>
    </div>
  );
};

export default Button;
