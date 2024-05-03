import styles from "./Stars.module.css";

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  return (
    <div>
      {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, i) => (
        <span
          key={value}
          className={`${styles.ratingStar} ${
            rating >= value
              ? (i + 1) % 2 !== 0
                ? styles.selected_left
                : styles.selected_right
              : ""
          }`}
        ></span>
      ))}
    </div>
  );
}
