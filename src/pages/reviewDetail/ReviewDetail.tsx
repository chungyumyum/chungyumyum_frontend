import { Badge } from "../../components";
import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./ReviewDetail.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";

export default function ReviewDetail() {
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
              <img src={gpsIcon} alt="gps_icon" />
            </button>
            <button className={styles.bookmarkBtn}>
              <img src={bookmarkIcon} alt="gps_icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
