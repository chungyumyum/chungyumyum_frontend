import styles from "./Login.module.css";
import rabbitImg from "../../assets/covers/login_main.png";
import kakaoLoginImg from "../../assets/covers/kakao_login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  const Rest_api_key = "1489f9d584bc92e45457d98b878c529c"; //REST API KEY
  const redirect_uri = "https://joyful-paprenjak-b81adf.netlify.app/login"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    location.href = kakaoURL;
  };

  const handleOauthKakao = async () => {
    try {
      const response = await axios.get(
        `https://server.cnuyum.com/members/oauth/login/KAKAO?code=${code}`
      );
      const data = response.data;
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/fail");
    }
  };

  if (code) {
    handleOauthKakao();
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        맛있는 발견, <br />
        기분 좋은 시작!
      </h1>
      <div className={styles.cover}>
        <img width="100%" src={rabbitImg} alt="rabbit_Img" />
      </div>

      <div>
        <p className={styles.description}>맛있는 순간을 함께 나눠요!</p>
        <button className={styles.kakaoLoginBtn} onClick={handleKakaoLogin}>
          <img src={kakaoLoginImg} alt="kakao_login_img" />
        </button>
      </div>
    </div>
  );
}
