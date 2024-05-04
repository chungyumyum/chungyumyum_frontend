import { ReactNode } from "react";
import styles from "./RatingModal.module.css";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/icons/close.svg";
import Badge from "../Badge/Badge";

export default function RatingModal({
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
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={closeIcon} alt="close_icon" />
        </button>
        <p className={styles.title}>충냠냠 등급 안내</p>
        <ul>
          <li className={styles.item}>
            <Badge type="one" size="big" />
            <div>새내기: 작성글 0개 이상</div>
          </li>
          <li className={styles.item}>
            <Badge type="two" size="big" />

            <div>쩝쩝학사: 작성글 5개 이상</div>
          </li>
          <li className={styles.item}>
            <Badge type="three" size="big" />

            <div>쩝쩝석사: 작성글 15개 이상</div>
          </li>
          <li className={styles.item}>
            <Badge type="four" size="big" />

            <div>쩝쩝박사: 작성글 25개 이상</div>
          </li>
          <li className={styles.item}>
            <Badge type="five" size="big" />

            <div>먹교수: 작성글 40개 이상</div>
          </li>
        </ul>
      </div>
    </ModalPortal>
  );
}

function ModalPortal({ children }: { children: ReactNode }) {
  const el = document.getElementById("modal") as HTMLElement;
  return ReactDOM.createPortal(children, el);
}
