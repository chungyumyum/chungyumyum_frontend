import styles from "./Badge.module.css";
import riceIcon from "../../assets/icons/rice.svg";

type BadgeProps = {
  type: "one" | "two" | "three" | "four" | "five";
};

export default function Badge({ type }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[type]}`}>
      <img width={10} src={riceIcon} alt="rice_icon" />
    </div>
  );
}
