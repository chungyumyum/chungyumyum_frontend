import { useEffect, useState } from "react";
import { Card } from "../../components";
import { Post } from "../../types/post";
import { getMyPosts } from "../../api/post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLoadPosts = async () => {
    try {
      const posts = await getMyPosts();
      setPosts(posts);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    handleLoadPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <Card
          style={
            index == 0
              ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
              : {}
          }
          key={post.id}
          writerName={post.writerName}
          imageUrl={post.imageUrl}
          description={post.description}
          rating={post.rating}
          restaurantName={post.restaurantName}
        />
      ))}
    </div>
  );
}
