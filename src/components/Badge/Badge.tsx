import styles from "./Badge.module.css";
import riceIcon from "../../assets/icons/rice.svg";
import { BadgeType } from "../../types/badge";

type BadgeProps = {
  type: BadgeType;
  size?: "small" | "big";
};

export default function Badge({ type, size = "small" }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[type]} ${styles[size]}`}>
      <img width={size === "small" ? 10 : ""} src={riceIcon} alt="rice_icon" />
    </div>
  );
}
