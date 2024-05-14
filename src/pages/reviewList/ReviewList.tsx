import { Card, SubHeader } from "../../components";
import styles from "./ReviewList.module.css";
import starIcon from "../../assets/icons/star_fill.svg";
import { useEffect, useState } from "react";
import { Post } from "../../types/post";
import { getPosts } from "../../api/post";
import { useParams, useSearchParams } from "react-router-dom";

const RATING: { [key: string]: number } = {
  HALF: 0.5,
  ONE: 1,
  ONE_HALF: 1.5,
  TWO: 2,
  TWO_HALF: 2.5,
  THREE: 3,
  THREE_HALF: 3.5,
  FOUR: 4,
  FOUR_HALF: 4.5,
  FIVE: 5,
};

export default function ReviewList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { id: name } = useParams();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");

  const handleLoadPosts = async () => {
    try {
      const posts = await getPosts({
        town: "",
        name: name,
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
    <>
      <SubHeader title={name as string} id={reviewId as string} />
      <div className={styles.reviewHeader}>
        <img src={starIcon} alt="star_icon" />
        {(
          posts.reduce((acc, curPost) => acc + RATING[curPost.rating], 0) /
          posts.length
        ).toFixed(1)}{" "}
        ({posts.length})
      </div>

      <div className={styles.contents}>
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
    </>
  );
}
