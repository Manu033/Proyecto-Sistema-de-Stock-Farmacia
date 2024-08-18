import React from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';
import classNames from "classnames";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={classNames(classes.modal, "overflow-scroll")}>
          <div className={classes.content}>{props.children}</div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Modal;