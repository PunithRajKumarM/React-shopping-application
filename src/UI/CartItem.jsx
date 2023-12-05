import React from "react";

export default function CartItem({
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
  className,
}) {
  return (
    <li className="cart-item">
      <p>
        {title} - {quantity} x {price}
      </p>
      <div>
        <div className={`cart-incre-decre-buttons ${className}`}>
          <button onClick={onDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={onIncrease}>+</button>
        </div>
      </div>
    </li>
  );
}
