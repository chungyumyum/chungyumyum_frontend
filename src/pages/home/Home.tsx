import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/post";
import { getMyPosts, getPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { searchState, townsState } from "../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import bannerCover03 from "../../assets/covers/banner5.png";
// import bannerCover04 from "../../assets/covers/banner6.webp";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import { Link, useNavigate } from "react-router-dom";
// import chochoro from "../../assets/covers/chochoro.png";
import newBanner01 from "../../assets/covers/newBanner01.png";
import newBanner02 from "../../assets/covers/newBanner02.png";

import pencil from "../../assets/icons/pencil2.svg";

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
  const [myPostsId, setMyPostsId] = useState<number[]>([]);
  const navigate = useNavigate();

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
      setPage((curPage) => curPage + 1);
    }
  }, [isVisible]);

  useEffect(() => {
    if (page > 0) {
      handleLoadMorePosts();
    }
  }, [page]);

  const handleLoadProflie = async () => {
    const myPosts = await getMyPosts();
    setMyPostsId(myPosts.map((post) => post.id));
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      return;
    }

    handleLoadProflie();
  }, []);

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
                <a href="https://volcano-knife-71c.notion.site/dfaa5f2b9f8a473581e5e280e5c301bb?pvs=4">
                  <img src={newBanner01} alt="banner-cover" />
                </a>
              </div>
              <div className={styles.slider}>
                <a href="https://volcano-knife-71c.notion.site/1551fc3638f143b2a7ec69d81777e0a8?pvs=4">
                  <img src={newBanner02} alt="banner-cover" />
                </a>
              </div>
            </Slider>
            <div className={styles.sliderCountTag}>{curSlideState + 1} / 2</div>
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
            isMyPost={myPostsId.includes(post.id)}
            ref={index === posts.length - 1 ? ref : null}
          />
        ))}
      </div>
    </div>
  );
}
