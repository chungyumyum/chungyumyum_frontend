import { Card, MainHeader } from "../../components";
import styles from "./Home.module.css";
import bannerCover from "../../assets/covers/banner.svg";
import { useEffect, useState } from "react";
import { Post } from "../../types/post";
import { getPosts } from "../../api/post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLoadPosts = async () => {
    try {
      const posts = await getPosts({
        town: "",
        name: "",
      });
      setPosts(posts);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    handleLoadPosts();
  }, []);

  return (
    <div className={styles.container}>
      <MainHeader />
      <div className={styles.contents}>
        <div className={styles.slider}>
          <a href="https://betacnuyummy.oopy.io/" className={styles.banner}>
            <img src={bannerCover} alt="banner-cover" />
          </a>
          <span className={styles.sliderTag}>1/1</span>
        </div>

        {posts.map((post) => (
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
