import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import pencilIcon from "../assets/icons/pencil.svg";
import homeIcon from "../assets/icons/home.svg";
import profileIcon from "../assets/icons/profile.svg";
import activeProfileIcon from "../assets/icons/profile_active.svg";
import activeHomeIcon from "../assets/icons/home_active.svg";
import activePencilIcon from "../assets/icons/pencil_active.svg";

export default function Layout() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <Outlet />
      </div>

      <div className={styles.navBar}>
        <Link to="/post">
          <div>
            <img
              src={pathname === "/post" ? activePencilIcon : pencilIcon}
              alt="home_icon"
            />
          </div>
          <p className={pathname === "/post" ? styles.active : ""}>글쓰기</p>
        </Link>
        <Link to="/">
          <div>
            <img
              src={
                pathname === "/" || pathname.includes("/reviewDetail")
                  ? activeHomeIcon
                  : homeIcon
              }
              alt="home_icon"
            />
          </div>
          <p
            className={
              pathname === "/" || pathname.includes("/reviewDetail")
                ? styles.active
                : ""
            }
          >
            홈
          </p>
        </Link>
        <Link to="/profile/posts">
          <div>
            <img
              src={
                pathname.includes("/profile") ? activeProfileIcon : profileIcon
              }
              alt="home_icon"
            />
          </div>
          <p
            style={{ marginLeft: "0.2rem" }}
            className={pathname.includes("/profile") ? styles.active : ""}
          >
            My
          </p>
        </Link>
      </div>
    </div>
  );
}
