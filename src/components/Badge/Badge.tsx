import styles from "./Badge.module.css";
import riceIcon from "../../assets/icons/rice.svg";
import { BadgeType } from "../../types/badge";
import { CSSProperties } from "react";

type BadgeProps = {
  type: BadgeType;
  size?: "small" | "big";
  sx?: CSSProperties;
};

export default function Badge({ sx = {}, type, size = "small" }: BadgeProps) {
  return (
    <div
      style={sx}
      className={`${styles.badge} ${styles[type]} ${styles[size]}`}
    >
      <img width={size === "small" ? 10 : ""} src={riceIcon} alt="rice_icon" />
    </div>
  );
}
