import { setModal } from "../store/slices/modal.slice";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import "../styles/user.css";
import React from "react";

const User = () => {
  const userName = localStorage.getItem("NameUser");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logAut = () => {
    dispatch(setModal("Session closed successfully."));
    localStorage.setItem("token", "");
    localStorage.setItem("NameUser", "");
    navigate("/");
  };

  return (
    <div className="container">
      <div>
        <img
          src="https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur.png"
          alt="User"
        />
        <h2>{userName}</h2>
        <button onClick={logAut}>
          <i className="bx bx-log-out"></i> Log aut
        </button>
      </div>
    </div>
  );
};

export default User;
