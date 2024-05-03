import { Badge } from "../../components";
import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./ReviewDetail.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import Stars from "../../components/Stars/Stars";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ReviewDetail() {
  const [fileList, setFileList] = useState<string[]>([
    "/test_cover01.jpg",
    "/test_cover02.jpg",
    "/test_cover03.jpg",
  ]);

  const [currentImg, setCurrentImg] = useState(0);

  return (
    <>
      <SubHeader title="행보케" />
      <div className={styles.contents}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <Badge type="three" size="big" />
            <div>
              <p className={styles.profileTitle}>김태진</p>
              <p className={styles.profileRole}>쩝쩝석사</p>
            </div>
          </div>
          <div>
            <button className={styles.gpsBtn}>
              <img width={25} src={gpsIcon} alt="gps_icon" />
            </button>
            <button className={styles.bookmarkBtn}>
              <img width={22} src={bookmarkIcon} alt="gps_icon" />
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

        <p className={styles.review}>
          마라탕 1단계로 먹는 맵찔이인데 별로 안 맵고 마라가 강하지 않아서
          누구나 맛있게 먹을 수 있어요! 마라마요새우는 바삭하고 맛있는데
          생각보다 버섯이 엄청 많아요...ㅎㅎ 그리고 여긴 유린기가 진짜입니다
          다들 강추하는 이유가 있었어요 꼭 드셔보세요!
        </p>

        <button className={styles.linkBtn}>
          <Link to="/">이 식당의 다른 후기</Link>
        </button>
      </div>
    </>
  );
}
