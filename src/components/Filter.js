import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productPerCategory, productsPerPrice } from "../store/slices/products.slice";
import "../styles/filter.css";

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const filterPrice = (e) => {
    e.preventDefault();
    dispatch(productsPerPrice(Number(from), Number(to)))
  };
  return (
    <div className="Filter">
      <button onClick={() => setOpenFilter(true)}>
        <i className="bx bx-filter-alt"></i> <span>Filters</span>
      </button>
      <div
        className="filter-menu"
        style={{ right: openFilter ? "0" : "-300px" }}
      >
        <button onClick={() => setOpenFilter(false)}>
          <i className="bx bx-x"></i>
        </button>
        <h3>Filters</h3>
        <div className="accordion">
          <div className={showPrice ? "block active" : "block"}>
            <button type="button" onClick={() => setShowPrice(!showPrice)}>
              Price
              <i
                className={`bx ${
                  showPrice ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              ></i>
            </button>
            <div className="contents">
              <form onSubmit={filterPrice}>
                <div>
                  <label htmlFor="price_from">From</label>
                  <input
                    type="number"
                    id="price_from"
                    onChange={(e) => setFrom(e.target.value)}
                    value={from}
                  />
                </div>
                <div>
                  <label htmlFor="price_to">To</label>
                  <input
                    type="number"
                    id="price_to"
                    onChange={(e) => setTo(e.target.value)}
                    value={to}
                  />
                </div>
                <button>Filter Price</button>
              </form>
            </div>
          </div>
          <div className={showCategory ? "block active" : "block"}>
            <button
              type="button"
              onClick={() => setShowCategory(!showCategory)}
            >
              Category
              <i
                className={`bx ${
                  showCategory ? "bx-chevron-up" : "bx-chevron-down"
                }`}
              ></i>
            </button>
            <div className="contents">
              <ul className="categories">
                {categories.map((category) => (
                  <li
                    onClick={() => {
                      dispatch(productPerCategory(category.id));
                      setOpenFilter(false);
                    }}
                    key={category.id}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
