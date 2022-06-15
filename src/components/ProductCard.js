import React from "react";
import { addProduct } from "../store/slices/cart.slice";
import { setModal } from "../store/slices/modal.slice";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addCart = () => {
    const productDates = {
      id: product.id,
      quantity: 1,
    };
    dispatch(addProduct(productDates));
    dispatch(setModal("Added product."));
  };
  const changeBtnCart = () => {
    addCart()
  }
  return (
    <li onClick={() => navigate(`/product/${product.id}`)}>
      <div className="card">
        <div className="card-img">
          <img className="img img-card-animate" src={product.productImgs[0]} alt="" />
          <img className="img img-card-animate-2" src={product.productImgs[1]} alt="" />
        </div>
        <div className="card-info">
          <h3>{product.title}</h3>
          <div>
            <p>Price</p>
            <span>$ {product.price}</span>
          </div>
          <button onClick={changeBtnCart}>
            <i className="bx bx-cart"></i>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ProductCard;
