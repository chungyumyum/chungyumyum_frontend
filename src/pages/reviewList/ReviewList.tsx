import { Card, SubHeader } from "../../components";
import styles from "./ReviewList.module.css";
import starIcon from "../../assets/icons/star_fill.svg";

export default function ReviewList() {
  return (
    <>
      <SubHeader title="행보케" />
      <div className={styles.reviewHeader}>
        <img src={starIcon} alt="star_icon" />
        4.7 (123)
      </div>

      <div className={styles.contents}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
