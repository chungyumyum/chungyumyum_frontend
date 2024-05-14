import { NavLink } from "react-router-dom";
import styles from "./Profile.module.css";
import { useContext, useEffect, useState } from "react";
import { TriggerUpdateCtx } from "./TriggerUpdateProvider";
import { getMyPosts } from "../../api/post";
import { getBookmarkedPosts } from "../../api/bookmarks";

export default function NavHeader() {
  const [myPostsCount, setMyPostsCount] = useState(0);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);
  const ctx = useContext(TriggerUpdateCtx);

  const handleLoadPosts = async () => {
    try {
      const posts = await getMyPosts();
      setMyPostsCount(posts.length);
    } catch (err) {
      console.log("error");
    }
  };

  const handleLoadBookmarked = async () => {
    try {
      const posts = await getBookmarkedPosts();
      setBookmarkedCount(posts.length);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    handleLoadPosts();
    handleLoadBookmarked();
  }, [ctx.update]);
  return (
    <div className={styles.navHeader}>
      <NavLink
        to="posts"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        내가 쓴 글 ({myPostsCount})
      </NavLink>
      <NavLink
        to="bookmark"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        북마크 ({bookmarkedCount})
      </NavLink>
    </div>
  );
}
