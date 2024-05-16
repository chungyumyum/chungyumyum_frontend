import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";
import { useEffect, useState } from "react";
import { Post } from "../../types/post";
import { getPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { searchState } from "../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerCover02 from "../../assets/covers/banner2.svg";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchValue = useRecoilValue(searchState);
  const [curSlideState, setCurSlideState] = useState(0);

  const settings = {
    infinite: true,
    speed: 1500,
    delay: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (current: number, next: number) => setCurSlideState(next),
  };

  const handleLoadPosts = async () => {
    try {
      const posts = await getPosts({
        town: "",
        name: searchValue,
      });
      setPosts(posts);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    handleLoadPosts();
  }, [searchValue]);

  console.log(curSlideState);

  return (
    <div className={styles.container}>
      <MainHeader />
      <div
        className={`${styles.contents} ${
          searchValue !== "" && styles.contentsPadding
        }`}
      >
        {searchValue === "" && (
          // <div className={styles.slider}>
          //   <a href="https://betacnuyummy.oopy.io/" className={styles.banner}>
          //     <img src={bannerCover} alt="banner-cover" />
          //   </a>
          //   <span className={styles.sliderTag}>1/1</span>
          // </div>

          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              <div className={styles.slider}>
                <a
                  href="https://betacnuyummy.oopy.io/"
                  className={styles.banner}
                >
                  <img src={bannerCover} alt="banner-cover" />
                </a>
              </div>
              <div className={styles.slider}>
                <img src={bannerCover02} alt="banner-cover" />
              </div>
            </Slider>
            <div className={styles.sliderCountTag}>{curSlideState + 1} / 2</div>
          </div>
        )}

        {posts.reverse().map((post) => (
          <Card
            key={post.id}
            writerName={post.writerName}
            writerRank={post.writerRank}
            restaurantName={post.restaurantName}
            rating={post.rating}
            imageUrl={post.imageUrl}
            description={post.description}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
}
