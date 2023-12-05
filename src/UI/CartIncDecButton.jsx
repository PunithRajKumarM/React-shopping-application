import React from "react";

export default function CartIncDecButton({
  children,
  className = "",
  onAdd,
  onRemove,
  quantity,
}) {
  return (
    // <div className="cart-incre-decre" {...props}>
    // <span>{children}</span>
    <div className={`cart-incre-decre-buttons ${className}`}>
      {children}
      <button onClick={onRemove}>-</button>
      <span>{quantity}</span>
      <button onClick={onAdd}>+</button>
    </div>
    // </div>
  );
}
