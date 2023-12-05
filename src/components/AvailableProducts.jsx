import React, { useEffect, useState } from "react";
import { DUMMY_DATA } from "../dummyData/data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AvailableProducts() {
  const [filteredProduct, setFilteredProduct] = useState(DUMMY_DATA);
  let search = useSelector((state) => state.search);

  useEffect(() => {
    let originalData = DUMMY_DATA.map((category) => ({
      ...category,
      product: category.product.filter((product) =>
        product.title.toLowerCase().includes(search.searchedText.toLowerCase())
      ),
    }));
    setFilteredProduct(originalData);
  }, [search]);
  console.log(filteredProduct);

  return (
    <div className="all-products">
      <h1>Available Product</h1>
      <div className="products">
        {/* {filteredProduct.map((item) =>
          item.product.map((prod) => (
            <Link to={`/categories/${prod.id}`} key={prod.id}>
              <img className="product-image" src={prod.src} alt="" />
            </Link>
          ))
        )} */}
        {filteredProduct.length !== 0 ? (
          <>
            {filteredProduct.map((item) =>
              item.product.map((prod) => (
                <Link to={`/categories/${prod.id}`} key={prod.id}>
                  <img className="product-image" src={prod.src} alt="" />
                </Link>
              ))
            )}
          </>
        ) : (
          <p>No such product</p>
        )}
      </div>
    </div>
  );
}
