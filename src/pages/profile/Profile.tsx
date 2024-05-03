import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";
import { Badge, Card } from "../../components";
import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headings}>
          <div />
          <h1 className={styles.title}>My</h1>
          <button className={styles.settingBtn}>
            <img width={23} src={settingIcon} alt="setting_icon" />
          </button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.profile}>
          <Badge size="big" type="four" />
          <div>
            <button className={styles.level}>새내기</button>
            <p className={styles.name}>홍길동</p>
          </div>
        </div>

        <div className={styles.navHeader}>
          <NavLink to="/">내가 쓴 글 (3)</NavLink>
          <NavLink to="/">북마크 (5)</NavLink>
        </div>

        <div className={styles.cards}>
          <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
