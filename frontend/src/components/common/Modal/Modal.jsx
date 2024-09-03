import React from "react";
import ReactDOM from "react-dom";
import classes from './Modal.module.css';
import classNames from "classnames";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const portalElement = document.getElementById("overlays");

const Modal = ({onClose, children, className}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={classNames(classes.modal, "overflow-scroll", className)}>
          <div className={classes.content}>{children}</div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default Modal;