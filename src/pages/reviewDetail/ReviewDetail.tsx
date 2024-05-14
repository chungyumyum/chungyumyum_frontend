import { Badge } from "../../components";
import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./ReviewDetail.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import bookmarkActiveIcon from "../../assets/icons/bookmark_active.svg";
import Stars from "../../components/Stars/Stars";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostDetail } from "../../types/post";
import { getPost } from "../../api/post";
import { BadgeType } from "../../types/badge";
import { deleteBookmarkedPost, storeBookmarkedPost } from "../../api/bookmarks";
import MapModal from "../../components/MapModal/MapModal";
import { getShops } from "../../api/shop";

const getRatingAsKorean = {
  FRESHMAN: "새내기",
  BACHELOR: "쩝쩝학사",
  MASTER: "쩝쩝석사",
  DOCTOR: "쩝쩝박사",
  PROFESSOR: "먹교수",
};

export default function ReviewDetail() {
  const [fileList, setFileList] = useState<string[]>([]);

  const { id } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const [post, setPost] = useState<PostDetail>({} as PostDetail);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const handleLoadPost = async () => {
    const post = await getPost(id as string);
    setPost(post);
    setFileList([post.imageUrl]);
    setIsBookmarked(post.alereadyBookmarked);
  };

  const handleBookmarkClick = async () => {
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (isBookmarked) {
      await deleteBookmarkedPost(post.id);
      setIsBookmarked(false);
    } else {
      await storeBookmarkedPost(post.id);
      setIsBookmarked(true);
    }
  };

  const handleLoadRestaurant = async () => {
    if (!post.restaurantName) {
      return;
    }
    const data = await getShops({ name: post.restaurantName });
    console.log("data:", data);
    setLocation({
      lat: data[0].latitude,
      lng: data[0].longitude,
    });
  };

  useEffect(() => {
    handleLoadPost();
  }, []);

  useEffect(() => {
    handleLoadRestaurant();
  }, [post]);

  return (
    <>
      {isOpen && (
        <MapModal location={location} onClose={() => setIsOpen(false)} />
      )}
      <SubHeader title={post.restaurantName} />
      <div className={styles.contents}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <Badge type={post.writerRank as BadgeType} size="big" />
            <div>
              <p className={styles.profileTitle}>{post.writerName}</p>
              <p className={styles.profileRole}>
                {getRatingAsKorean[post.writerRank]}
              </p>
            </div>
          </div>
          <div>
            <button className={styles.gpsBtn} onClick={() => setIsOpen(true)}>
              <img width={25} src={gpsIcon} alt="gps_icon" />
            </button>
            <button
              className={styles.bookmarkBtn}
              onClick={handleBookmarkClick}
            >
              {!isBookmarked && (
                <img width={22} src={bookmarkIcon} alt="bk_icon" />
              )}
              {isBookmarked && (
                <img width={22} src={bookmarkActiveIcon} alt="bk_icon" />
              )}
            </button>
          </div>
        </div>

        <div className={styles.pictureContainer}>
          <div
            className={styles.pictureDeem}
            onClick={() =>
              setCurrentImg((prev) =>
                prev + 1 >= fileList.length ? 0 : prev + 1
              )
            }
          />
          <img id="cover" src={fileList[currentImg]} alt="cover" />
          <span className={styles.sliderTag}>
            {currentImg + 1}/{fileList.length}
          </span>
        </div>

        <div className={styles.starsContainer}>
          <Stars rating={4} />
        </div>

        <p className={styles.review}>{post.description}</p>

        <button className={styles.linkBtn}>
          <Link to={`/reviewList/${post.restaurantName}?reviewId=${id}`}>
            이 식당의 다른 후기
          </Link>
        </button>
      </div>
    </>
  );
}
