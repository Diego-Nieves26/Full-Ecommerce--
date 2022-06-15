import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { setModal } from "../store/slices/modal.slice";

const Modal = ({ text }) => {
  const dispatch = useDispatch();
  return (
    <div className="modal">
      <div>
        <button onClick={() => dispatch(setModal(null))}>
          <i className="bx bx-x"></i>
        </button>
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default Modal;
