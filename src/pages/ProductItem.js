import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components";
import { setIsLoading } from "../store/slices/loading.slice";
import { productPerCategory } from "../store/slices/products.slice";
import { addProduct } from "../store/slices/cart.slice";
import { setModal } from "../store/slices/modal.slice";
import "../styles/productItem.css";

const ProductItem = () => {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const sameProducts = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(true));
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
      .then((res) => {
        const product = res.data.data.products.find(
          (productItem) => productItem.id === Number(id)
        );
        setData(product);
        dispatch(productPerCategory(product.category.id));
      })
      .finally(() => dispatch(setIsLoading(false)));
  }, [id, dispatch]);
  const addToCart = () => {
    const product = {
      id: id,
      quantity: quantity,
    };
    dispatch(addProduct(product));
    dispatch(setModal("Added product."));
  };
  const lowerQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const [indexImg, setIndexImg] = useState(0);

  const prev = () => {
    if (indexImg === 0) {
      setIndexImg(2);
    } else {
      setIndexImg(indexImg - 1);
    }
  };
  const next = () => {
    if (indexImg === 2) {
      setIndexImg(0);
    } else {
      setIndexImg(indexImg + 1);
    }
  };
  return (
    <div>
      <div className="direction">
        <Link className="ruta" to="/">
          Home
        </Link>
        <div></div>
        <span>{data.title}</span>
      </div>
      <div className="parent-container">
        <section className="img-product">
          <button onClick={prev}>
            <i className="bx bx-chevron-left"></i>
          </button>
          <img
            className="img-2"
            src={data.productImgs?.[indexImg]}
            alt="Product Img"
          />
          <button onClick={next}>
            <i className="bx bx-chevron-right"></i>
          </button>
        </section>
        <section className="Product-detail">
          <h2>{data.title}</h2>
          <section className="Product-info-responsive">
            <p>{data.description}</p>
          </section>
          <div>
            <div className="price">
              <span>Price</span>
              <p>{data.price}</p>
            </div>
            <div className="quantity">
              <span>Quantity</span>
              <div>
                <button onClick={lowerQuantity}>-</button>
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                ></input>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>
          <button onClick={addToCart}>
            Add to cart <i className="bx bx-cart"></i>
          </button>
        </section>
        <section className="Product-info">
          <p>{data.description}</p>
        </section>
      </div>
      <section className="products-suggestions">
        <h3>Discover similar items</h3>
        <div>
          {sameProducts?.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductItem;
