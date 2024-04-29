import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import pencilIcon from "../assets/icons/pencil.svg";
import homeIcon from "../assets/icons/home.svg";
import profileIcon from "../assets/icons/profile.svg";

export default function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <Outlet />
      </div>

      <div className={styles.navBar}>
        <Link to="/post">
          <p>
            <img src={pencilIcon} alt="pencil_icon" />
          </p>
          <p>글쓰기</p>
        </Link>
        <Link to="/">
          <p>
            <img src={homeIcon} alt="home_icon" />
          </p>
          <p>홈</p>
        </Link>
        <Link to="/profile">
          <p>
            <img src={profileIcon} alt="profile_icon" />
          </p>
          <p style={{ marginLeft: "0.2rem" }}>My</p>
        </Link>
      </div>
    </div>
  );
}
