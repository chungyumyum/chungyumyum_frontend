import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <Outlet />
      </div>

      <div className={styles.navBar}>
        <div>글쓰기</div>
        <div>홈</div>
        <div>My</div>
      </div>
    </div>
  );
}
