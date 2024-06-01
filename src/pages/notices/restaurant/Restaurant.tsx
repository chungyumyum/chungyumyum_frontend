import example from "../../../assets/covers/example.png";
import styles from "./Restaurant.module.css";
import mainCover from "../../../assets/chochoro/main.jpg";
import left01 from "../../../assets/chochoro/left.webp";
import right01 from "../../../assets/chochoro/right.jpg";
import left02 from "../../../assets/chochoro/left02.jpg";
import right02 from "../../../assets/chochoro/right02.webp";
import left03 from "../../../assets/chochoro/left03.webp";
import right03 from "../../../assets/chochoro/right03.jpg";

export default function Restaurant() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cover}>
          <img src={mainCover} alt="banner-cover" />
        </div>

        <div className={styles.contents}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>초초로</h2>
            <p>신선한 재료로 정성껏 만든 다양한 수제 디저트를 즐겨보세요!</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>위치</h2>
            <p style={{ marginBottom: "1rem" }}>대전 유성구 궁동 402-3</p>
            <p>(궁동 로데오거리에 위치해있습니다.)</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>영업시간</h2>
            <p style={{ marginBottom: "1rem" }}>월-금 08:30 - 20:30</p>
            <p style={{ marginBottom: "1rem" }}>주말 08:30 - 22:00</p>
            <p>매주 화요일 정기휴무</p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>오픈채팅</h2>
            <a
              style={{ fontWeight: "bold", color: "dodgerblue" }}
              href="https://open.kakao.com/o/sH7lTs2f"
            >
              https://open.kakao.com/o/sH7lTs2f
            </a>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>인스타그램</h2>
            <a
              style={{
                fontWeight: "bold",
                color: "dodgerblue",
              }}
              href="https://www.instagram.com/chochoro__gungdong/"
            >
              https://www.instagram.com/chochoro__gungdong/
            </a>
            <p style={{ marginTop: "1rem", marginBottom: "3rem" }}>
              예약 주문, 가격 문의는 개별 연락 부탁드립니다!
            </p>

            <div className={styles.sectionGal}>
              <div>
                <img src={left01} alt="chochoro-left" />
              </div>
              <div>
                <img src={right01} alt="chochoro-right" />
              </div>
            </div>
          </section>
          <section style={{ marginTop: "8rem" }} className={styles.section}>
            <h2 className={styles.sectionTitle}>
              당일 예약 가능 & 빠른 주문 제작
            </h2>

            <p style={{ marginBottom: "3rem", lineHeight: "1.5" }}>
              갑작스럽게 케이크를 준비해야할 때 걱정하지 마세요! 초초로에는 당일
              예약이 가능하답니다. 컵케이크는 10분~30분 전에, 케이크는
              30분~2시간 전에 연락 주시면 신속하면서도 정성스럽게
              준비해드립니다. 😋🍴
            </p>

            <div className={styles.sectionGal}>
              <div style={{ width: "50%" }}>
                <img src={left02} alt="chochoro-left" />
              </div>
              <div style={{ width: "50%" }}>
                <img src={right02} alt="chochoro-right" />
              </div>
            </div>
          </section>

          <section style={{ marginTop: "8rem" }} className={styles.section}>
            <h2 className={styles.sectionTitle}>착한 가격의 1인 케이크</h2>

            <p style={{ marginBottom: "3rem", lineHeight: "1.5" }}>
              요즘은 1만원대 케이크 찾기 어려우시죠? 초초로에서는 정성스럽게
              제작한 수제 케이크를 합리적인 가격으로 만나볼 수 있습니다. 특별한
              날, 특별한 순간을 초초로와 함께 하세요! 🍰✨
            </p>

            <div className={styles.sectionGal}>
              <div style={{ width: "50%" }}>
                <img src={left03} alt="chochoro-left" />
              </div>
              <div style={{ width: "50%" }}>
                <img src={right03} alt="chochoro-right" />
              </div>
            </div>

            <p style={{ marginTop: "3rem", lineHeight: "1.5" }}>
              사장님이 말씀하시기를, 망고 디저트가 특히 인기가 많다고 해요!
              신선한 망고의 풍부한 맛이 가득한 디저트들을 종류별로 즐겨보세요.
              🥭💛 <br />
              <br />
              초초로에서 달콤한 시간을 함께 하세요. 여러분의 방문을 기다리고
              있겠습니다!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
