import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  buyProducts,
  getCart,
  removeProduct,
} from "../store/slices/cart.slice";
import { setModal } from "../store/slices/modal.slice";
import "../styles/nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const cartData = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  const handleShow = () => {
    const token = localStorage.getItem("token");
    if (token !== "") {
      setShowCart(!showCart);
    } else {
      navigate("/login");
    }
    totalCartCost();
  };
  const removeProductFromCart = (id) => {
    dispatch(removeProduct(id));
    dispatch(
      setModal(
        "Product removed, if the total is not updated, close and open the cart."
      )
    );
    totalCartCost();
  };
  const totalCartCost = () => {
    let totalCart = 0;
    for (let i = 0; i < cartData.length; i++) {
      totalCart += Number(
        cartData[i].price * cartData[i].productsInCart.quantity
      );
    }
    setTotal(totalCart);
  };
  const buy = () => {
    if (cartData.length === 0) {
      dispatch(setModal("There are no products in the cart."));
    } else {
      dispatch(buyProducts());
      dispatch(setModal("Purchase made successfully."));
      navigate("/purchases");
      setShowCart(false);
    }
  };
  return (
    <nav>
      <Link className="logo" to="/">
        e-commerce
      </Link>
      <div className="nav-links">
        <Link to="/user" className="btn-nav">
          <i className="bx bx-user"></i>
        </Link>
        <Link to="/purchases" className="btn-nav">
          <i className="bx bx-store"></i>
        </Link>
        <button className="btn-nav btn-cart" onClick={handleShow}>
          <i className={showCart ? "bx bx-x" : "bx bx-cart"}></i>
        </button>
      </div>
      <div className="Cart" style={{ right: showCart ? "0" : "-81%" }}>
        <h2>Cart</h2>
        <section className="main-cart">
          {cartData.length === 0 ? (
            <h1 className="empty-cart">Empty cart</h1>
          ) : (
            cartData.map((product) => (
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
                className="box-cart"
              >
                <h4>{product.brand}</h4>
                <h3>{product.title}</h3>
                <div className="quantity-of-products">
                  {product.productsInCart.quantity}
                </div>
                <span className="priceByUnit">Price by unit {product.price}</span>
                <button onClick={() => removeProductFromCart(product.id)}>
                  <i className="bx bx-trash"></i>
                </button>
                <div className="subtotal">
                  <p>Subtotal:</p>
                  <span>{product.price * product.productsInCart.quantity}</span>
                </div>
              </div>
            ))
          )}
        </section>
        <section className="cart-total">
          <div>
            <p>Total:</p>
            <span>$ {total}</span>
          </div>
          <button onClick={buy}>Checkout</button>
        </section>
      </div>
    </nav>
  );
};

export default Nav;
