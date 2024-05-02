import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import { useState } from "react";
import SearchShopPage from "../../components/SearchShopPage/SearchShopPage";

export default function Post() {
  const [des, setDes] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <SearchShopPage isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <SubHeader title="글쓰기" />
      <div className={styles.contents}>
        <div>
          <button
            className={styles.searchShopBtn}
            onClick={() => setIsOpen(true)}
          >
            <img src={gpsIcon} alt="gps_icon" />
            <span>가게를 검색하세요.</span>
          </button>
          <div className={styles.pictureBtn}>
            <img src={cameraIcon} alt="camera_icon" />
            <div>사진을 업로드하세요.</div>
          </div>
          <div className={styles.ratingInput}>
            <div>별점을 선택하세요.</div>
            <div className={styles.stars}>
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, i) => (
                <span
                  onClick={() => setRating(value)}
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
          </div>
          <div className={styles.textareaContainer}>
            <textarea
              placeholder="설명을 입력하세요."
              className={styles.textarea}
              onChange={(e) => setDes(e.target.value)}
              maxLength={300}
            ></textarea>
            <span className={styles.wordCountTag}>{des.length}/300</span>
          </div>
          <button className={styles.submitBtn}>등록</button>
        </div>
      </div>
    </div>
  );
}
