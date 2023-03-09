import { setModal } from "../store/slices/modal.slice";
import { useDispatch } from "react-redux/es/exports";
import React from "react";

const Modal = ({ text }) => {
  const dispatch = useDispatch();
  return (
    <div className="modal">
      <div className="modalContainer">
        <button
          className="modalContainer__button"
          onClick={() => dispatch(setModal(null))}
        >
          <i className="bx bx-x"></i>
        </button>
        <h2 className="modalContainer__h2">{text}</h2>
      </div>
    </div>
  );
};

export default Modal;
