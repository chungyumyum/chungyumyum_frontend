import PageModal from "../PageModal/PageModal";
import styles from "./UploadCoversPage.module.css";
import closeIcon from "../../assets/icons/close.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import pictureCover01 from "../../assets/covers/picture01.svg";
import pictureCover02 from "../../assets/covers/picture02.svg";
import pictureCover03 from "../../assets/covers/picture03.svg";
import pictureCover04 from "../../assets/covers/picture04.svg";
import closeWhiteIcon from "../../assets/icons/close-white.svg";
import React, { Dispatch, SetStateAction, useState } from "react";

type UploadCoversPageProps = {
  isOpen: boolean;
  onClose: () => void;
  fileList: string[];
  onSetFileList: Dispatch<SetStateAction<string[]>>;
};

export default function UploadCoversPage({
  isOpen,
  onClose,
  fileList,
  onSetFileList,
}: UploadCoversPageProps) {
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files as FileList);
    if (e.target.files?.length + fileList.length > 4) {
      alert("사진은 최대 4장까지 가능합니다.");
    } else {
      files.forEach((file) => {
        onSetFileList((prevFileList) => [
          ...prevFileList,
          URL.createObjectURL(file),
        ]);
      });
    }
  };

  return (
    <PageModal isOpen={isOpen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>사진 첨부</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img width={14} src={closeIcon} alt="close_icon" />
          </button>
        </div>

        <label className={styles.pictureLabel} htmlFor="file">
          <img src={pictureIcon} alt="picture_icon" />
          <span>사진 추가</span>
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileSelected}
        />
        <div className={styles.pictureList}>
          <p>사진 첨부는 최대 4장까지 가능합니다.</p>
          <div className={styles.pictureArea}>
            {/* <div className={styles.picture}>
              <img src={pictureCover01} alt="picture_cover" />
              <button className={styles.pictureCloseBtn}>
                <img src={closeWhiteIcon} alt="close_icon" />
              </button>
            </div> */}
            {fileList.map((file) => (
              <div key={file} className={styles.picture}>
                <img src={file} alt="picture_cover" />
                <button className={styles.pictureCloseBtn}>
                  <img src={closeWhiteIcon} alt="close_icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.submitBtn}>등록</button>
      </div>
    </PageModal>
  );
}
