import React from "react";

export default function Button({ children, textOnly, className, ...props }) {
  return (
    <>
      <button
        className={textOnly ? `text-button ${className}` : className}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
