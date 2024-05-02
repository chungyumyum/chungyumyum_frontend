import SubHeader from "../../components/SubHeader/SubHeader";
import styles from "./Post.module.css";
import gpsIcon from "../../assets/icons/gps.svg";
import cameraIcon from "../../assets/icons/camera-line.svg";
import { useEffect, useRef, useState } from "react";
import { SearchShopPage, UploadCoversPage } from "../../components";

export default function Post() {
  const [des, setDes] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pIsOpen, setIsPopen] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);
  const [currentImg, setCurrentImg] = useState(1);
  const [moved, setMoved] = useState(false);
  const ref = useRef(null);
  const [minus, setMinus] = useState(0);

  const handleDragStart = () => {
    console.log(1);
  };
  const handleDragEnd = () => {
    console.log(2);
  };
  const handleDrag = (e: any) => {
    e.preventDefault();
    document.body.style.cursor = "grabbing";
    console.log(3);
    setMinus(minus - 1);
    console.log(minus);
  };

  return (
    <div>
      <SearchShopPage isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <UploadCoversPage
        isOpen={pIsOpen}
        onClose={() => setIsPopen(false)}
        fileList={fileList}
        onSetFileList={setFileList}
      />
      <SubHeader title="글쓰기" />
      <div className={styles.contents}>
        <div>
          <button
            className={styles.searchShopBtn}
            onClick={() => setIsOpen(true)}
          >
            <img width={14} src={gpsIcon} alt="gps_icon" />
            <span>가게를 검색하세요.</span>
          </button>
          <div
            onMouseDown={handleDrag}
            className={styles.pictureBtn}
            onClick={() => setIsPopen(true)}
          >
            {fileList.length > 0 ? (
              <div className={styles.pictureSlider}>
                <div
                  ref={ref}
                  onMouseDown={handleDragStart}
                  onMouseEnter={handleDragEnd}
                  onMouseMove={handleDrag}
                  className={styles.pictureDeem}
                />
                {fileList.map((file, i) =>
                  i == 0 ? (
                    <img
                      style={{ zIndex: 4 - i, left: `${minus}%` }}
                      key={file}
                      id="cover"
                      src={file}
                      alt="cover"
                    />
                  ) : (
                    <img
                      style={{ zIndex: 4 - i }}
                      key={file}
                      id="cover"
                      src={file}
                      alt="cover"
                    />
                  )
                )}
                <span className={styles.sliderTag}>
                  {currentImg}/{fileList.length}
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
          <button className={styles.submitBtn}>등록</button>
        </div>
      </div>
    </div>
  );
}
