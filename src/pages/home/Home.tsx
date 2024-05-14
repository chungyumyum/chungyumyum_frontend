import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";
import { useEffect, useState } from "react";
import { Post } from "../../types/post";
import { getPosts } from "../../api/post";
import { useRecoilValue } from "recoil";
import { searchState } from "../../recoil/atom";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchValue = useRecoilValue(searchState);

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

  return (
    <div className={styles.container}>
      <MainHeader />
      <div
        className={`${styles.contents} ${
          searchValue !== "" && styles.contentsPadding
        }`}
      >
        {searchValue === "" && (
          <div className={styles.slider}>
            <a href="https://betacnuyummy.oopy.io/" className={styles.banner}>
              <img src={bannerCover} alt="banner-cover" />
            </a>
            <span className={styles.sliderTag}>1/1</span>
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
