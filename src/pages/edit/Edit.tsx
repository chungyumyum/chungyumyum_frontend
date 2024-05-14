import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "../post/Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import { useEffect, useRef, useState } from "react";
import { SearchShopPage, UploadCoversPage } from "../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPost } from "../../api/post";
import { PostDetail } from "../../types/post";

export type FileListItem = {
  file: File;
  name: string;
  url: string;
};

const RATING: { [key: string]: string } = {
  "0.5": "HALF",
  "1": "ONE",
  "1.5": "ONE_HALF",
  "2": "TWO",
  "2.5": "TWO_HALF",
  "3": "THREE",
  "3.5": "THREE_HALF",
  "4": "FOUR",
  "4.5": "FOUR_HALF",
  "5": "FIVE",
};

const RATING_NUMBER: { [key: string]: number } = {
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

export default function Edit() {
  const [post, setPost] = useState<PostDetail>();
  const [des, setDes] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pIsOpen, setIsPopen] = useState(false);
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const [alreadyExistingFileList, setAlreadyExistingFileList] = useState<
    string[]
  >([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedShop, setSelectedShop] = useState({
    name: post?.restaurantName,
    id: post?.id,
  });
  const navigate = useNavigate();
  const ref = useRef(null);
  const [presignedFileList, setPresignedFileList] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId")!;

  const handleRegister = async () => {
    // try {
    //   await createPost({
    //     restaurantId: selectedShop.id,
    //     rating: RATING[rating],
    //     description: des,
    //     postImageUrls: presignedFileList,
    //   });
    //   navigate(`/`);
    // } catch (err: any) {
    //   console.error(err);
    //   alert("리뷰 작성을 실패하였습니다");
    // }
  };

  const handleLoadPost = async () => {
    const post = await getPost(postId);
    setPost(post);
    setSelectedShop({
      name: post.restaurantName,
      id: post.id,
    });
    setDes(post.description);
    setRating(RATING_NUMBER[post?.rating as string]);
    setAlreadyExistingFileList([post.imageUrl]);
    console.log(post.imageUrl);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }

    handleLoadPost();
  }, []);

  return (
    <div>
      <SearchShopPage
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onSelectedShop={(name: string, id: number) =>
          setSelectedShop({
            name,
            id,
          })
        }
      />
      <UploadCoversPage
        isOpen={pIsOpen}
        onClose={() => setIsPopen(false)}
        parentFileList={fileList}
        onSetFileList={setFileList}
        onSetPresignedFileList={setPresignedFileList}
      />
      <SubHeader title="글 수정하기" />
      <div className={styles.contents}>
        <div>
          <button
            className={styles.searchShopBtn}
            onClick={() => setIsOpen(true)}
          >
            <img width={17} src={gpsIcon} alt="gps_icon" />
            <span>{selectedShop.name || "가게를 검색하세요"}</span>
          </button>
          <div
            ref={ref}
            className={styles.pictureBtn}
            onClick={() => {
              if (fileList.length > 0) return;
              setIsPopen(true);
            }}
          >
            {alreadyExistingFileList.length > 0 ? (
              <div className={styles.pictureSlider}>
                <div
                  className={styles.pictureDeem}
                  onClick={() =>
                    setCurrentImg((prev) =>
                      prev + 1 >= fileList.length ? 0 : prev + 1
                    )
                  }
                />
                <img
                  id="cover"
                  src={alreadyExistingFileList[currentImg]}
                  alt="cover"
                />
                <button
                  className={styles.pictureAddBtn}
                  onClick={() => setIsPopen(true)}
                >
                  <img width={10} src={cameraIcon} alt="camera_icon" />
                </button>
                <span className={styles.sliderTag}>
                  {currentImg + 1}/{alreadyExistingFileList.length}
                </span>
              </div>
            ) : (
              <>
                <img src={cameraIcon} alt="camera_icon" />
                <div>사진을 업로드하세요.</div>
              </>
            )}
          </div>
          <div className={styles.ratingInput}>
            <div>별점을 선택하세요.</div>
            <div className={styles.stars}>
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value, i) => (
                <span
                  onClick={() => setRating(value)}
                  key={value}
                  className={`${styles.ratingStar} ${
                    rating >= value
                      ? (i + 1) % 2 !== 0
                        ? styles.selected_left
                        : styles.selected_right
                      : ""
                  }`}
                ></span>
              ))}
            </div>
          </div>
          <div className={styles.textareaContainer}>
            <textarea
              placeholder="설명을 입력하세요."
              className={styles.textarea}
              onChange={(e) => setDes(e.target.value)}
              maxLength={300}
              value={des}
            ></textarea>
            <span className={styles.wordCountTag}>{des.length}/300</span>
          </div>
          <button
            disabled={
              selectedShop.id === 0 ||
              rating === 0 ||
              fileList.length === 0 ||
              des.length === 0
            }
            onClick={handleRegister}
            className={`${styles.submitBtn} ${
              (selectedShop.id === 0 ||
                rating === 0 ||
                fileList.length === 0 ||
                des.length === 0) &&
              styles.disabled
            } `}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
