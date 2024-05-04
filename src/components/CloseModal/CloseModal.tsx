import { ReactNode } from "react";
import styles from "./CloseModal.module.css";
import ReactDOM from "react-dom";

export default function CloseModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalPortal>
      <div className={styles.deem} onClick={onClose}></div>
      <div className={styles.container}>
        <p className={styles.message}>
          사진 첨부를 취소하시겠어요?
          <br />
          작성하신 내용이 삭제됩니다.
        </p>
        <div className={styles.btnContainer}>
          <button onClick={onClose}>취소</button>
          <button>확인</button>
        </div>
      </div>
    </ModalPortal>
  );
}

function ModalPortal({ children }: { children: ReactNode }) {
  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
}
