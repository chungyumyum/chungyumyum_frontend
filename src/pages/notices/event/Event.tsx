import bannerCover03 from "../../../assets/covers/banner5.png";
import example from "../../../assets/covers/example.png";
import styles from "./Event.module.css";

export default function Event() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <h1 className={styles.title}>충대 맛집 소개하고 배민 상품권 받자!</h1> */}
        <div className={styles.cover}>
          <img src={bannerCover03} alt="banner-cover" />
        </div>

        <div className={styles.contents}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              🎉 충냠냠 런칭 기념 이벤트 🎉
            </h2>
            <p>
              여러분만의 충대 맛집 후기를 공유하고 배달의 민족 상품권을
              받아가세요!
            </p>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📌 참여 방법:</h2>
            <ol>
              <li className={styles.item}>
                1. 충냠냠에서 맛집 후기를 5개 이상 작성하고 학위를 부여받으세요.
              </li>
              <li className={styles.item}>
                2. 마이페이지에서 이름과 등급, 내가 쓴 글의 개수가 한번에
                보이도록 화면을 캡처해주세요.
                <div>
                  <p className={styles.example}>예시화면</p>
                  <img width={300} src={example} alt="example" />
                </div>
              </li>
              <li className={styles.item}>
                <p className={styles.special}>
                  3. 캡처한 화면을 구글폼에 첨부하여 제출하세요.
                </p>
                <p>
                  구글폼 링크 :{" "}
                  <a href="https://forms.gle/NwXABHZMcCf7q3Ye6">
                    https://forms.gle/NwXABHZMcCf7q3Ye6
                  </a>
                </p>
              </li>
            </ol>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>📅 이벤트 기간:</h2>
            <p>2024년 5월 29일 ~ 2024년 6월 9일</p>
          </section>

          <section className={`${styles.section} ${styles.specialSection}`}>
            구글폼을 제출해주신 분들께 추첨을 통해 배달의 민족 1만원권 상품권을
            드립니다. 앞으로도 여러분들이 서로의 경험을 공유하며 쉽고 빠르게
            맛집 정보를 공유할 수 있도록 노력하는 충냠냠이 되겠습니다. 많은 관심
            부탁드려요!😊
          </section>
        </div>
      </div>
    </div>
  );
}
