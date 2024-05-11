import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.contents}>
        <div className={styles.slider}>
          <a href="https://betacnuyummy.oopy.io/" className={styles.banner}>
            <img src={bannerCover} alt="banner-cover" />
          </a>
          <span className={styles.sliderTag}>1/1</span>
        </div>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
