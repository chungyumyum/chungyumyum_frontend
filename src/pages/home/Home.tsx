import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";

export default function Home() {
  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.contents}>
        <div className={styles.slider}>
          <a href="#" className={styles.banner}>
            <img src={bannerCover} alt="banner-cover" />
          </a>
        </div>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
