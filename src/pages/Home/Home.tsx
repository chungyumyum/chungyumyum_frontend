import Header from "../../components/Header";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contents}>
        <div className={styles.slider}>
          <a href="#" className={styles.banner}>
            <img src={bannerCover} alt="banner-cover" />
          </a>
        </div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
        <div className={styles.card}>foajeofw</div>
      </div>
    </div>
  );
}
