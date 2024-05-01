import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import starIcon from "../../assets/icons/star.svg";

export default function Post() {
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
            <div>
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
              <img src={starIcon} alt="star_icon" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
