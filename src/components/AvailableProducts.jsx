import React from "react";
import { DUMMY_DATA } from "../dummyData/data";
import { Link } from "react-router-dom";

export default function AvailableProducts() {
  return (
    <div className="all-products">
      <h1>Available Product</h1>
      <div className="products">
        {DUMMY_DATA.map((item) =>
          item.product.map((prod) => (
            <Link to={`/categories/${prod.id}`} key={prod.id}>
              <img className="product-image" src={prod.src} alt="" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
