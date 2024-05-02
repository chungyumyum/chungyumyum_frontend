import { ReactNode } from "react";
import styles from "./PageModal.module.css";
import ReactDOM from "react-dom";

type PageModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export default function PageModal({ isOpen, children }: PageModalProps) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalPortal>
      <div className={styles.container}>
        <h2>PageModal</h2>
        {children}
      </div>
    </ModalPortal>
  );
}

function ModalPortal({ children }: { children: ReactNode }) {
  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
}
