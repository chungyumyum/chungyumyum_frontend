import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import { ReactComponent as GpsIcon } from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import { useEffect, useRef, useState } from "react";
import { SearchShopPage, UploadCoversPage } from "../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPost } from "../../api/post";
import Toast from "../../components/Toast/Toast";
import { getShops } from "../../api/shop";
import building from "../../assets/covers/post_building_bg.svg";

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

export default function Post() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("restaurantName"); // test
  const [des, setDes] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pIsOpen, setIsPopen] = useState(false);
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedShop, setSelectedShop] = useState({
    name: "",
    id: 0,
  });
  const navigate = useNavigate();
  const ref = useRef(null);
  const [presignedFileList, setPresignedFileList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);

      if (selectedShop.id === 0) {
        setToastMessage("가게를 입력해 주세요.");
        return;
      }

      if (presignedFileList.length === 0) {
        setToastMessage("사진을 업로드해 주세요.");
        return;
      }

      if (rating === 0) {
        setToastMessage("별점을 입력해 주세요.");
        return;
      }

      if (des.length === 0) {
        setToastMessage("리뷰글을 작성해 주세요.");
        return;
      }

      await createPost({
        restaurantId: selectedShop.id,
        rating: RATING[rating],
        description: des,
        postImageUrls: presignedFileList,
      });

      setToastMessage("");
      navigate(`/`);
    } catch (err: any) {
      console.error(err);
      alert("리뷰 작성을 실패하였습니다");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (typeof query !== "string") {
      return;
    }

    if (!query) {
      return;
    }

    (async function () {
      const restaurants = await getShops({ name: query });
      setSelectedShop({ name: query, id: restaurants[0].id });
    })();
  }, [query]);

  return (
    <div style={{ background: "#fff", paddingBottom: "80px" }}>
      {toastMessage && (
        <Toast
          message={toastMessage}
          isShow={toastMessage !== ""}
          onClose={() => setToastMessage("")}
        />
      )}
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
      <SubHeader title="글쓰기" />
      <img src={building} alt="building-bg" className={styles.buildingBG} />
      <div className={styles.contents}>
        <div style={{ marginTop: "-3rem" }}>
          <button
            className={styles.searchShopBtn}
            onClick={() => setIsOpen(true)}
          >
            <GpsIcon width={17} style={{ fill: "red" }} />
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
            {fileList.length > 0 ? (
              <div className={styles.pictureSlider}>
                <div
                  className={styles.pictureDeem}
                  onClick={() =>
                    setCurrentImg((prev) =>
                      prev + 1 >= fileList.length ? 0 : prev + 1
                    )
                  }
                />
                <img id="cover" src={fileList[currentImg].url} alt="cover" />
                <button
                  className={styles.pictureAddBtn}
                  onClick={() => setIsPopen(true)}
                >
                  <img width={10} src={cameraIcon} alt="camera_icon" />
                </button>
                <span className={styles.sliderTag}>
                  {currentImg + 1}/{fileList.length}
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
            {/* <div>별점을 선택하세요.</div> */}
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
              placeholder="리뷰를 작성하세요."
              className={styles.textarea}
              onChange={(e) => setDes(e.target.value)}
              maxLength={300}
            ></textarea>
            <span className={styles.wordCountTag}>{des.length}/300</span>
          </div>
          <button
            onClick={handleRegister}
            // disabled={
            //   selectedShop.id === 0 ||
            //   rating === 0 ||
            //   des.length === 0 ||
            //   loading
            // }
            className={styles.submitBtn}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
