import { Badge } from "../../components";
import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./ReviewDetail.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import Stars from "../../components/Stars/Stars";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostDetail } from "../../types/post";
import { getPost } from "../../api/post";

export default function ReviewDetail() {
  const [fileList, setFileList] = useState<string[]>([
    "/test_cover01.jpg",
    "/test_cover02.jpg",
    "/test_cover03.jpg",
  ]);

  const { id } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const [post, setPost] = useState<PostDetail>({} as PostDetail);

  const handleLoadPost = async () => {
    const post = await getPost(id as string);
    setPost(post);
  };

  useEffect(() => {
    handleLoadPost();
  }, []);

  return (
    <>
      <SubHeader title={post.restaurantName} />
      <div className={styles.contents}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <Badge type="three" size="big" />
            <div>
              <p className={styles.profileTitle}>{post.writerName}</p>
              <p className={styles.profileRole}>쩝쩝석사</p>
            </div>
          </div>
          <div>
            <button className={styles.gpsBtn}>
              <img width={25} src={gpsIcon} alt="gps_icon" />
            </button>
            <button className={styles.bookmarkBtn}>
              <img width={22} src={bookmarkIcon} alt="gps_icon" />
            </button>
          </div>
        </div>

        <div className={styles.pictureContainer}>
          <div
            className={styles.pictureDeem}
            onClick={() =>
              setCurrentImg((prev) =>
                prev + 1 >= fileList.length ? 0 : prev + 1
              )
            }
          />
          <img id="cover" src={fileList[currentImg]} alt="cover" />
          <span className={styles.sliderTag}>
            {currentImg + 1}/{fileList.length}
          </span>
        </div>

        <div className={styles.starsContainer}>
          <Stars rating={4} />
        </div>

        <p className={styles.review}>{post.description}</p>

        <button className={styles.linkBtn}>
          <Link to="/reviewList/2">이 식당의 다른 후기</Link>
        </button>
      </div>
    </>
  );
}
