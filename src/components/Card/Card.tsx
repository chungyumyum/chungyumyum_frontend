import styles from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";
import Badge from "../Badge/Badge";
import moreIcon from "../../assets/icons/more.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import { CSSProperties } from "react";
import { BadgeType } from "../../types/badge";

type CardProps = {
  style?: CSSProperties;
  writerName?: string;
  writerRank?: string;
  imageUrl?: string;
  description?: string;
  restaurantName?: string;
  rating?: string;
  id?: number;
};

const RATING: { [key: string]: string } = {
  HALF: "0.5",
  ONE: "1",
  ONE_HALF: "1.5",
  TWO: "2",
  TWO_HALF: "2.5",
  THREE: "3",
  THREE_HALF: "3.5",
  FOUR: "4",
  FOUR_HALF: "4.5",
  FIVE: "5",
};

export default function Card({
  style,
  writerName,
  writerRank,
  imageUrl,
  description,
  restaurantName,
  rating,
  id,
}: CardProps) {
  const { pathname } = useLocation();
  return (
    <Link to={`/reviewDetail/${id}`} className={styles.card} style={style}>
      <div className={styles.cardCover}>
        <img src={imageUrl} alt="card-cover" />
        {!pathname.includes("reviewList") && (
          <span className={styles.cardRating}>⭐ {RATING[String(rating)]}</span>
        )}
      </div>
      <div className={styles.cardContents}>
        <div className={styles.cardHeader}>
          {pathname.includes("reviewList") ? (
            <div className={styles.ratingTitle}>
              ⭐ {RATING[String(rating)]}
            </div>
          ) : (
            <>
              <h2 className={styles.cardTitle}>{restaurantName}</h2>
              {pathname.includes("profile/posts") && (
                <button
                  className={styles.moreBtn}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img width={3} src={moreIcon} alt="more_icon" />
                </button>
              )}
              {pathname.includes("profile/bookmark") && (
                <button
                  className={styles.bmkBtn}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <img width={15} src={bookmarkIcon} alt="bookmark_icon" />
                </button>
              )}
            </>
          )}
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardFooter}>
          <Badge type={writerRank as BadgeType} />
          {writerName}
        </div>
      </div>
    </Link>
  );
}
