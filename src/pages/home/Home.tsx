import React from "react";
import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import { useEffect, useRef, useState } from "react";
import { Post } from "../../types/post";
import { getMyPosts, getPosts } from "../../api/post";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState, townsState } from "../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import bannerCover03 from "../../assets/covers/banner5.png";
import bannerCover04 from "../../assets/covers/banner4.png";
import { useIntersectionObserver } from "react-intersection-observer-hook";
// import { useNavigate } from "react-router-dom";
import chochoro from "../../assets/covers/chochoro.png";
import newBanner01 from "../../assets/covers/newBanner01.png";
import newBanner02 from "../../assets/covers/newBanner02.png";
import arrowDown from "../../assets/icons/arrowDown.svg";
import { Link } from "react-router-dom";
// import pencil from "../../assets/icons/pencil2.svg";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchValue = useRecoilValue(searchState);
  const [curSlideState, setCurSlideState] = useState(0);
  const [towns, setTowns] = useRecoilState(townsState);
  const [toggle, setToggle] = useState<"rating" | "createdDate">("createdDate");
  const [page, setPage] = useState(0);
  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;
  const isFirstRender = useRef(false);
  const [myPostsId, setMyPostsId] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [isOpend, setIsOpened] = useState(false);

  // const navigate = useNavigate();

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
        console.log("postsData:", postsData);
        setPage(0);
      }
    } catch (err) {
      console.log("error");
    }
  };

  const handleNewestClick = () => {
    setToggle("createdDate");
    setIsOpened(false);
  };

  const handleRatingClick = () => {
    setToggle("rating");
    setIsOpened(false);
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
                  <img
                    src={newBanner02}
                    alt="banner-cover"
                    fetchPriority="high"
                  />
                </a>
              </div>
              <div className={styles.slider}>
                <a href="https://volcano-knife-71c.notion.site/1551fc3638f143b2a7ec69d81777e0a8?pvs=4">
                  <img src={newBanner01} alt="banner-cover" />
                </a>
              </div>
              <div className={styles.slider}>
                <Link to="/notice-event-restaurant">
                  <img src={chochoro} alt="banner-cover" />
                </Link>
              </div>
            </Slider>
            <div className={styles.sliderCountTag}>{curSlideState + 1} / 3</div>
          </div>
        )}
        <div className={styles.control}>
          <div className={styles.categoryBtns}>
            <button
              className={`${styles.categoryBtn} ${
                towns[0] === "GUNGDONG" && styles.isSelected
              }`}
              onClick={() => {
                setSelectedCategory(1);
                setTowns(["GUNGDONG"]);
              }}
            >
              궁동
            </button>
            <button
              className={`${styles.categoryBtn} ${
                towns[0] === "BONGMYEONG_DONG" && styles.isSelected
              }`}
              onClick={() => {
                setSelectedCategory(2);
                setTowns(["BONGMYEONG_DONG"]);
              }}
            >
              봉명동
            </button>
            <button
              className={`${styles.categoryBtn} ${
                towns[0] === "EOEUN_DONG" && styles.isSelected
              }`}
              onClick={() => {
                setSelectedCategory(3);
                setTowns(["EOEUN_DONG"]);
              }}
            >
              어은동
            </button>
            <button
              className={`${styles.categoryBtn} ${
                towns[0] === "JUKDONG" && styles.isSelected
              }`}
              onClick={() => {
                setSelectedCategory(4);
                setTowns(["JUKDONG"]);
              }}
            >
              죽동
            </button>
            <button
              className={`${styles.categoryBtn} ${
                towns[0] === "JANGDAE_DONG" && styles.isSelected
              }`}
              onClick={() => {
                setSelectedCategory(5);
                setTowns(["JANGDAE_DONG"]);
              }}
            >
              장대동
            </button>
          </div>
          <div className={styles.option}>
            <button
              className={styles.expand}
              onClick={() => setIsOpened((prev) => !prev)}
            >
              <img src={arrowDown} alt="arrow_down" />
            </button>
            <button
              className={`${styles.controlBtn}`}
              onClick={() => setIsOpened((prev) => !prev)}
            >
              {toggle === "createdDate" ? "최신순" : "별점순"}
            </button>
            {isOpend && (
              <div className={styles.dropDown}>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleRatingClick}>별점순</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.cardList}>
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
    </div>
  );
}
