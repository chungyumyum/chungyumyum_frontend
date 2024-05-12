import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import { useEffect, useRef, useState } from "react";
import { SearchShopPage, UploadCoversPage } from "../../components";
import { useNavigate } from "react-router-dom";
import { getPresignedUrl } from "../../api/image";

export type FileListItem = {
  name: string;
  url: string;
};

export default function Post() {
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

  const handleGetPresignedUrl = async (file: string) => {
    const data = await getPresignedUrl(file);
    return data;
  };

  const handleRegister = () => {
    console.log(rating);
    console.log(fileList);
    console.log(selectedShop);
    console.log(des);

    // files.forEach(async (file) => {
    //   const data = await handleGetPresignedUrl(file.name);
    //   console.log(data);
    //   try {
    //     await axios.put(data.presignedUrl, file, {
    //       headers: {
    //         "Content-Type": "image/*",
    //       },
    //     });

    //     onSetFileList((prevList) => [...prevList, data.fileName]);
    //   } catch (err: any) {
    //     console.log(err);
    //   }
    // });
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
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
      />
      <SubHeader title="글쓰기" />
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
            ></textarea>
            <span className={styles.wordCountTag}>{des.length}/300</span>
          </div>
          <button onClick={handleRegister} className={styles.submitBtn}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
