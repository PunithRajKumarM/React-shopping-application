import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, close, open }) {
  if (!open) return;
  return createPortal(
    <div className="modal-layout">
      <div className="modal">
        <button className="modal-close-button" onClick={close}>
          x
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
