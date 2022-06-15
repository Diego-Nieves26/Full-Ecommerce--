import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setModal } from "../store/slices/modal.slice";
import "../styles/login.css";
import { setIsLoading } from "../store/slices/loading.slice";

const Login = () => {
  const [registeredUser, setRegisteredUser] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitLogin = (data) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem(
          "NameUser",
          res.data.data.user.firstName + " " + res.data.data.user.lastName
        );
        dispatch(setModal("Logged in."));
        navigate("/");
      })
      .catch((error) => dispatch(setModal(error.response.data.message)))
      .finally(() => dispatch(setIsLoading(false)));
  };
  const submitNewLogin = (data) => {
    dispatch(setIsLoading(true));
    data.role = "normal";
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
      .then(() => {
        dispatch(setModal("Account created, now log in please."));
        navigate("/login");
      })
      .catch((error) => dispatch(setModal(error.response.data.message)))
      .finally(() => dispatch(setIsLoading(false)));
  };
  const btnChange = () => {
    setRegisteredUser(true);
    reset({});
  };
  return (
    <>
      {registeredUser ? (
        <div className="login already-registered">
          <strong>Welcome! Enter your email and password to continue</strong>
          <p>You have to Log In to access to your cart</p>
          <section>
            <b>Test Data</b>
            <p>
              <i className="bx bx-envelope bx-tada"></i> mason@gmail.com
            </p>
            <p>
              <i className="bx bx-lock-alt bx-tada"></i> mason1234
            </p>
          </section>
          <form onSubmit={handleSubmit(submitLogin)}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" {...register("email")} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" {...register("password")} />
            </div>
            <button>Login</button>
          </form>
          <span>
            Don't have an account?{" "}
            <button onClick={() => setRegisteredUser(false)}>Sign up</button>
          </span>
        </div>
      ) : (
        <div className="login">
          <strong>Sign up</strong>
          <form onSubmit={handleSubmit(submitNewLogin)}>
            <div>
              <label htmlFor="new-email">Email</label>
              <input type="email" id="new-email" {...register("email")} />
            </div>
            <div>
              <label htmlFor="first-name">Fist Name</label>
              <input type="text" id="first-name" {...register("firstName")} />
            </div>
            <div>
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" {...register("lastName")} />
            </div>
            <div>
              <label htmlFor="new-password">Password</label>
              <input
                type="password"
                id="new-password"
                {...register("password")}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone (10 characters)</label>
              <input type="number" id="phone" {...register("phone")} />
            </div>
            <button>Sign up</button>
          </form>
          <span>
            Already have you an account?{" "}
            <button onClick={btnChange}>Log in</button>
          </span>
        </div>
      )}
    </>
  );
};

export default Login;
