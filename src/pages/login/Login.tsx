import styles from "./Login.module.css";
import rabbitImg from "../../assets/covers/login_main.png";
import kakaoLoginImg from "../../assets/covers/kakao_login.png";

export default function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        맛있는 발견, <br />
        기분 좋은 시작!
      </h1>
      <img width="100%" src={rabbitImg} alt="rabbit_Img" />

      <div>
        <p className={styles.description}>맛있는 순간을 함께 나눠요!</p>
        <button className={styles.kakaoLoginBtn}>
          <img src={kakaoLoginImg} alt="kakao_login_img" />
        </button>
      </div>
    </div>
  );
}
