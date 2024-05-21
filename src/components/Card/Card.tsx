import styles from "./Card.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Badge from "../Badge/Badge";
import moreIcon from "../../assets/icons/more.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import { CSSProperties, MouseEvent, useContext, useState } from "react";
import { BadgeType } from "../../types/badge";
import { deletePost } from "../../api/post";
import { TriggerUpdateCtx } from "../../pages/profile/TriggerUpdateProvider";
import { deleteBookmarkedPost, storeBookmarkedPost } from "../../api/bookmarks";
import bookmarkActiveIcon from "../../assets/icons/bookmark_active.svg";
import { replaceRestCharacters } from "../../util/replaceMiddleCharacter";

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
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(true);

  const ctx = useContext(TriggerUpdateCtx);
  const navigate = useNavigate();

  const handleDeletePost = async () => {
    await deletePost(String(id));
  };

  const handleBookmarkClick = async (e: MouseEvent) => {
    e.preventDefault();
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (isBookmarked) {
      await deleteBookmarkedPost(id as number);
      setIsBookmarked(false);
    } else {
      await storeBookmarkedPost(id as number);
      setIsBookmarked(true);
    }

    ctx.triggerUpdate();
  };

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
                    setIsPopoverOpened((prev) => !prev);
                    console.log("check");
                  }}
                >
                  <img width={3} src={moreIcon} alt="more_icon" />
                </button>
              )}
              {pathname.includes("profile/bookmark") && (
                <button
                  className={styles.bookmarkBtn}
                  onClick={handleBookmarkClick}
                >
                  {!isBookmarked && (
                    <img width={15} src={bookmarkIcon} alt="bk_icon" />
                  )}
                  {isBookmarked && (
                    <img width={15} src={bookmarkActiveIcon} alt="bk_icon" />
                  )}
                </button>
              )}
            </>
          )}
        </div>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardFooter}>
          <Badge type={writerRank as BadgeType} />
          {replaceRestCharacters(writerName ?? "")}
        </div>
      </div>

      {isPopoverOpened && (
        <div className={styles.popover}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/edit?postId=${id}`);
            }}
            className={styles.popOverBtn}
          >
            수정하기
          </button>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await handleDeletePost();
              ctx.triggerUpdate();
            }}
            className={styles.popOverBtn}
          >
            삭제하기
          </button>
        </div>
      )}
    </Link>
  );
}
