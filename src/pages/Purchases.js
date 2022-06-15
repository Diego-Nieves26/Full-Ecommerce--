import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getPurchases } from "../store/slices/purchases.slice";
import "../styles/purchase.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchasesData = useSelector((state) => state.purchases);
  const options = { year: "numeric", month: "long", day: "numeric" };
  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);
  return (
    <div className="purchase">
      <div className="direction">
        <Link className="ruta" to="/">
          Home
        </Link>
        <div></div>
        <span>Purchases</span>
      </div>
      <h1>My Purchases</h1>
      <section className="purchase-main">
        {purchasesData.map((purchase) => (
          <div key={purchase.id}>
            <div className="purchase-header">
              <h3>
                {new Date(purchase.createdAt).toLocaleDateString(
                  "en-US",
                  options
                )}
              </h3>
            </div>
            <ul>
              {purchase.cart.products.map((product) => (
                <li
                  onClick={() => navigate(`/product/${product.id}`)}
                  key={product.id}
                >
                  <h5>{product.title}</h5>
                  <div>{product.productsInCart.quantity}</div>
                  <span>
                    $ {product.price * product.productsInCart.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Purchases;
