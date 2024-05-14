import styles from "./Profile.module.css";
import settingIcon from "../../assets/icons/setting.svg";
import { Badge } from "../../components";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import levelIcon from "../../assets/icons/level.svg";
import { useEffect, useState } from "react";
import RatingModal from "../../components/RatingModal/RatingModal";
import { ProfileType } from "../../types/profile";
import { getProflie } from "../../api/profile";
import { getMyPosts } from "../../api/post";
import { getBookmarkedPosts } from "../../api/bookmarks";

const getRatingAsKorean = {
  FRESHMAN: "새내기",
  BACHELOR: "쩝쩝학사",
  MASTER: "쩝쩝석사",
  DOCTOR: "쩝쩝박사",
  PROFESSOR: "먹교수",
};

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType);

  const [myPostsCount, setMyPostsCount] = useState(0);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

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
  }, []);

  const handleLoadProflie = async () => {
    const profile = await getProflie();
    setProfile(profile);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }

    handleLoadProflie();
  }, []);

  return (
    <>
      <RatingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className={styles.header}>
        <div className={styles.headings}>
          <div />
          <h1 className={styles.title}>My</h1>
          <button className={styles.settingBtn}>
            <Link to="/setting">
              <img width={23} src={settingIcon} alt="setting_icon" />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.profile}>
          <Badge size="big" type={profile.rank} />
          <div>
            <div
              className={styles.levelContainer}
              onClick={() => setIsOpen(true)}
            >
              <button className={styles.level}>
                {getRatingAsKorean[profile.rank]}
              </button>
              <img width={13} src={levelIcon} alt="level_icon" />
            </div>
            <p className={styles.name}>{profile.nickname}</p>
          </div>
        </div>

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
        <Outlet />
      </div>
    </>
  );
}
