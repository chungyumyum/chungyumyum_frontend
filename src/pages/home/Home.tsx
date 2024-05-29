import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";
import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/post";
import { getPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { searchState, townsState } from "../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerCover02 from "../../assets/covers/banner2.svg";
import bannerCover03 from "../../assets/covers/banner5.png";
import bannerCover04 from "../../assets/covers/banner6.webp";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchValue = useRecoilValue(searchState);
  const [curSlideState, setCurSlideState] = useState(0);
  const towns = useRecoilValue(townsState);
  const [toggle, setToggle] = useState<"rating" | "createdDate">("createdDate");
  const [page, setPage] = useState(0);
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const isFirstRender = useRef(false);

  const settings = {
    infinite: true,
    speed: 4000,
    delay: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    beforeChange: (current: number, next: number) => setCurSlideState(next),
  };

  const handleLoadMorePosts = async () => {
    try {
      const posts = await getPosts({
        towns: towns,
        name: searchValue,
        sort: `${toggle},desc`,
        page: page,
      });
      setPosts((prevPosts) => [...prevPosts, ...posts]);
    } catch (err) {
      console.log("error");
    }
  };

  const handleLoadPosts = async () => {
    try {
      if (towns.length === 0) {
        setPosts([]);
      } else {
        const postsData = await getPosts({
          towns: towns,
          name: searchValue,
          sort: `${toggle},desc`,
        });
        setPosts([...postsData]);
        setPage(0);
      }
    } catch (err) {
      console.log("error");
    }
  };

  const handleNewestClick = () => {
    setToggle("createdDate");
  };

  const handleRatingClick = () => {
    setToggle("rating");
  };

  useEffect(() => {
    handleLoadPosts();
  }, [searchValue, towns, toggle]);

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true;
      return;
    }
    if (isVisible) {
      console.log("visible!");
      setPage((curPage) => curPage + 1);
    }
  }, [isVisible]);

  useEffect(() => {
    if (page > 0) {
      handleLoadMorePosts();
    }
  }, [page]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className={styles.container}>
      <MainHeader />
      <div
        className={`${styles.contents} ${
          searchValue !== "" && styles.contentsPadding
        }`}
      >
        {searchValue === "" && (
          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              <div className={styles.slider}>
                <Link to="/notice-event">
                  <img src={bannerCover03} alt="banner-cover" />
                </Link>
              </div>
              <div className={styles.slider}>
                <img src={bannerCover04} alt="banner-cover" />
              </div>
              <div className={styles.slider}>
                <img src={bannerCover02} alt="banner-cover" />
              </div>
            </Slider>
            <div className={styles.sliderCountTag}>{curSlideState + 1} / 3</div>
          </div>
        )}
        <div className={styles.control}>
          <button
            onClick={handleNewestClick}
            className={`${styles.controlBtn} ${
              toggle === "createdDate" && styles.selected
            }`}
          >
            최신순
          </button>
          <button
            onClick={handleRatingClick}
            className={`${styles.controlBtn} ${
              toggle === "rating" && styles.selected
            }`}
          >
            별점순
          </button>
        </div>
        {posts.map((post, index) => (
          <Card
            key={post.id}
            writerName={post.writerName}
            writerRank={post.writerRank}
            restaurantName={post.restaurantName}
            rating={post.rating}
            imageUrl={post.imageUrl}
            description={post.description}
            id={post.id}
            ref={index === posts.length - 1 ? ref : null}
          />
        ))}
      </div>
    </div>
  );
}
