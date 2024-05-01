import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BackdropStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalOverlayStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  background-color: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
`;

const Backdrop: React.FC = () => {
  return <BackdropStyle />;
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ModalOverlayStyle>
      <div>{children}</div>
    </ModalOverlayStyle>
  );
};

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("overlays--root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay children={children} />,
        document.getElementById("overlays--root")!
      )}
    </>
  );
};

export default Modal;
