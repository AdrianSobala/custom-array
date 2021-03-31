import React from "react";

import "./modal.scss";

const Modal = React.forwardRef((props, ref) => {
    return (
        <div className="modalWrapper" ref={ref}>
            <div className="modalContent">
                {props?.disableClose ? (
                    ""
                ) : (
                    <button
                        className="closeModal"
                        onClick={() => props.handleCloseModal(ref)}
                    >
                        <span className="fas fav4-plus">highlight_off</span>
                    </button>
                )}
                {props.children}
            </div>
        </div>
    );
});

export default Modal;

export const handleCloseModal = (ref) => {
    if (ref && ref.current) {
        ref.current.classList.remove("show");
    }
};
export const handleShowModal = (ref) => {
    if (ref && ref.current) {
        ref.current.classList.add("show");
    }
};
