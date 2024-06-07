import { useContext, useEffect, useState } from "react";
import { Card } from "../../components";
import { Post } from "../../types/post";
import { getMyPosts } from "../../api/post";
import styles from "./Profile.module.css";
import { TriggerUpdateCtx } from "./TriggerUpdateProvider";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const ctx = useContext(TriggerUpdateCtx);

  const handleLoadPosts = async () => {
    try {
      const posts = await getMyPosts();
      setPosts(posts);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      return;
    }

    handleLoadPosts();
  }, [ctx.update]);

  return (
    <div
      className={`${styles.posts} ${
        posts.length < 1 ? styles.isEmpty : styles.isNotEmpty
      }
      ${posts.length === 1 && styles.hasOnePost}
      `}
    >
      {posts.length === 0 ? (
        <>작성한 글이 없습니다.</>
      ) : (
        posts
          .reverse()
          .map((post, index) => (
            <Card
              style={
                index == 0
                  ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
                  : {}
              }
              id={post.id}
              key={post.id}
              writerName={post.writerName}
              imageUrl={post.imageUrl}
              description={post.description}
              rating={post.rating}
              restaurantName={post.restaurantName}
              writerRank={post.writerRank}
            />
          ))
      )}
    </div>
  );
}
