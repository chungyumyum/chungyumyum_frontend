import prevIcon from "../../assets/icons/prev.svg";
import styles from "./SubHeader.module.css";

type SubHeaderProps = {
  title: string;
};

export default function SubHeader({ title }: SubHeaderProps) {
  return (
    <div className={styles.container}>
      <button className={styles.prevButton}>
        <img src={prevIcon} alt="prev_icon" />
      </button>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
