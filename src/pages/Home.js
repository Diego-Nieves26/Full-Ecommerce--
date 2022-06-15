import React, { useEffect } from "react";
import "../styles/home.css";
import { Search, Filter, ProductCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/slices/products.slice";
import { getCategories } from "../store/slices/categories.slice";

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="Home">
      <div className="search-and-filter">
        <Search />
        <Filter />
      </div>
      <ul className="main">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
