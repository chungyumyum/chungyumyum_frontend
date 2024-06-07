import { useContext, useEffect, useState } from "react";
import { Card } from "../../components";
import { Post } from "../../types/post";
import { getBookmarkedPosts } from "../../api/bookmarks";
import styles from "./Profile.module.css";
import { TriggerUpdateCtx } from "./TriggerUpdateProvider";

export default function Bookmark() {
  const [posts, setPosts] = useState<Post[]>([]);
  const ctx = useContext(TriggerUpdateCtx);

  const handleLoadPosts = async () => {
    try {
      const posts = await getBookmarkedPosts();
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
        <>북마크 된 포스트가 없습니다.</>
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
              key={post.id}
              id={post.id}
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
