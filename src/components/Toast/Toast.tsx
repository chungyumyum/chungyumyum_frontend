import { useEffect } from "react";
import styles from "./Toast.module.css";

type ToastProps = {
  isShow: boolean;
  message: string;
  onClose: () => void;
};

export default function Toast({ isShow, message, onClose }: ToastProps) {
  if (!isShow) {
    return <></>;
  }

  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, []);
  return <div className={styles.container}>{message}</div>;
}
