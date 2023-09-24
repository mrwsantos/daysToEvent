import React, { useEffect } from "react";
import ReactModal, { Styles, Props as ReactModalProps } from "react-modal";

const customStyles: Styles = {
  content: {
    width: "100%",
    maxWidth: "300px",
    height: "fit-content",
    border: "0",
    margin: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 9999,
    backdropFilter: "blur(10px)",
  },
};

export function Modal(props: ReactModalProps) {
  useEffect(() => {
    ReactModal.setAppElement('#__next')
  }, [])

  return (
    <ReactModal style={customStyles} {...props}>
      {props.children}
    </ReactModal>
  );
}
