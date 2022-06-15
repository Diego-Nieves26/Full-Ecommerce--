import React from "react";
import "../styles/search.css";
import { useForm } from "react-hook-form";
import { searchProduct } from "../store/slices/products.slice";
import { useDispatch } from "react-redux";

const Search = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const submitQuery = (data) => {
    dispatch(searchProduct(data.query));
  };
  return (
    <form className="Search" onSubmit={handleSubmit(submitQuery)}>
      <input
        type="text"
        placeholder="What are you looking for?"
        {...register("query")}
      />
      <button>
        <i className="bx bx-search-alt-2"></i>
      </button>
    </form>
  );
};

export default Search;
