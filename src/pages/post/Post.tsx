import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import starIcon from "../../assets/icons/star.svg";
import { useState } from "react";

export default function Post() {
  const [des, setDes] = useState("");

  return (
    <div>
      <SubHeader title="글쓰기" />
      <div className={styles.contents}>
        <form>
          <button className={styles.searchShopBtn}>
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
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
            </div>
          </div>
          <div className={styles.textareaContainer}>
            <textarea
              placeholder="설명을 입력하세요."
              className={styles.textarea}
              onChange={(e) => setDes(e.target.value)}
              maxLength={299}
            ></textarea>
            <span className={styles.wordCountTag}>{des.length}/300</span>
          </div>
          <button className={styles.submitBtn}>등록</button>
        </form>
      </div>
    </div>
  );
}
