import Header from "../../components/Header";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";
import cardCover01 from "../../assets/covers/card_cover01.jpg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contents}>
        <div className={styles.slider}>
          <a href="#" className={styles.banner}>
            <img src={bannerCover} alt="banner-cover" />
          </a>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <a>더보기</a>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardCover}>
            <img src={cardCover01} alt="card-cover" />
          </div>
          <div className={styles.cardContents}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>이런이궈 마라탕 충남대점</h2>
              <span className={styles.cardRating}>⭐ 4.5</span>
            </div>
            <p className={styles.cardDescription}>
              체감상 지금 충대에서 가장 인기 많은 마라탕집이 이곳인 것 같아요!
              다른 곳에선 볼 수 없던 재료도 많고, 고기도 원하는 만큼 담을 수
              있고, 소스도 원하는대로 제조해서 먹을 수 있고, 무엇보다 밥이랑
              아이스크림이 공짜라서 너무 좋아요!! 사장님도 친절하시고 쿠폰도
              줘서 앞으로도 자주 올 것 같아요ㅎㅎ 아직 안 가보신 분 있다면 꼭
              가보세요!
            </p>
            <div className={styles.cardFooter}>홍길동</div>
          </div>
        </div>
      </div>
    </div>
  );
}
