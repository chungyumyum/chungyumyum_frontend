import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";
import { Badge, Card } from "../../components";
import { NavLink, Outlet } from "react-router-dom";
import levelIcon from "../../assets/icons/level.svg";

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
            <div className={styles.levelContainer}>
              <button className={styles.level}>새내기</button>
              <img width={13} src={levelIcon} alt="level_icon" />
            </div>
            <p className={styles.name}>홍길동</p>
          </div>
        </div>

        <div className={styles.navHeader}>
          <NavLink
            to="posts"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            내가 쓴 글 (3)
          </NavLink>
          <NavLink
            to="bookmark"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            북마크 (5)
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
}
