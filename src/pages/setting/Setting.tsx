import { useNavigate } from "react-router-dom";
import { SubHeader } from "../../components";
import styles from "./Setting.module.css";

export default function Setting() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div>
      <SubHeader title="설정" />
      <ul className={styles.list}>
        <li className={styles.item}>
          <button>
            <a href="https://open.kakao.com/o/sYAt0epg">1:1 문의</a>
          </button>
        </li>
        <li className={styles.item}>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
        <li className={styles.item}>
          <button>탈퇴하기</button>
        </li>
      </ul>
    </div>
  );
}
