import styles from "./Card.module.css";
import { Link, useLocation } from "react-router-dom";
import Badge from "../Badge/Badge";
import moreIcon from "../../assets/icons/more.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import { CSSProperties } from "react";

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
  console.log(imageUrl);
  return (
    <Link to={`/reviewDetail/${id}`} className={styles.card} style={style}>
      <div className={styles.cardCover}>
        {/* <img src={cardCover01} alt="card-cover" /> */}
        <img
          // src={imageUrl}
          // src="https://image.cnuyum.com/images/856f4290-6ca7-40e6-9338-5d8a06d50055.jpg"
          // src="https://image.cnuyum.com/images/b960e365-1828-4d49-82ae-aa8173f5436f.jpg"
          src="https://image.cnuyum.com/images/4de0db72-bc72-4ca7-83a2-a2161d46394c.jpg"
          // src="https://image.cnuyum.com/images/856f4290-6ca7-40e6-9338-5d8a06d50055.jpg"
          alt="card-cover"
        />
        {!pathname.includes("reviewList") && (
          <span className={styles.cardRating}>⭐ {rating}</span>
        )}
      </div>
      <div className={styles.cardContents}>
        <div className={styles.cardHeader}>
          {pathname.includes("reviewList") ? (
            <div className={styles.ratingTitle}>⭐ {rating}</div>
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
          <Badge type="one" />
          {writerName}
        </div>
      </div>
    </Link>
  );
}
