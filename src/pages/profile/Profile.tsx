import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";
import { Badge } from "../../components";
import { Link, NavLink, Outlet } from "react-router-dom";
import levelIcon from "../../assets/icons/level.svg";
import { useState } from "react";
import RatingModal from "../../components/RatingModal/RatingModal";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RatingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className={styles.header}>
        <div className={styles.headings}>
          <div />
          <h1 className={styles.title}>My</h1>
          <button className={styles.settingBtn}>
            <Link to="/setting">
              <img width={23} src={settingIcon} alt="setting_icon" />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.profile}>
          <Badge size="big" type="four" />
          <div>
            <div
              className={styles.levelContainer}
              onClick={() => setIsOpen(true)}
            >
              <button className={styles.level}>쩝쩝박사</button>
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
