import { searchProduct } from "../store/slices/products.slice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import "../styles/search.css";
import React from "react";

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
