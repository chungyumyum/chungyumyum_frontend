import PageModal from "../PageModal/PageModal";
import styles from "./UploadCoversPage.module.css";
import closeIcon from "../../assets/icons/close.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import closeWhiteIcon from "../../assets/icons/close-white.svg";
import React, { Dispatch, SetStateAction, useState } from "react";
import CloseModal from "../CloseModal/CloseModal";
import { getPresignedUrl } from "../../api/image";
import axios from "axios";

type UploadCoversPageProps = {
  isOpen: boolean;
  onClose: () => void;
  fileList: string[];
  presignedFileList: string[];
  onSetFileList: Dispatch<SetStateAction<string[]>>;
  onSetPresignedFileList: Dispatch<SetStateAction<string[]>>;
};

export default function UploadCoversPage({
  isOpen,
  onClose,
  fileList,
  onSetFileList,
  presignedFileList,
  onSetPresignedFileList,
}: UploadCoversPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleGetPresignedUrl = async (file: string) => {
    const data = await getPresignedUrl(file);
    return data;
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files as FileList);

    if (e.target.files?.length + fileList.length > 4) {
      alert("사진은 최대 4장까지 가능합니다.");
    } else {
      files.forEach(async (file) => {
        const data = await handleGetPresignedUrl(file.name);
        console.log(data);
        try {
          const res = await axios.put(data.presignedUrl, file, {
            headers: {
              "Content-Type": "image/*",
            },
          });

          console.log(res);
        } catch (err: any) {
          console.log(err);
        }

        // console.log(presignedUrl);
        // onSetFileList((prevFileList) => [...prevFileList, presignedUrl]);
      });

      // files.forEach((file) => {
      //   onSetFileList((prevFileList) => [
      //     ...prevFileList,
      //     URL.createObjectURL(file),
      //   ]);
      // });
    }
  };

  const handleRegisterPicture = () => {
    onClose();
  };

  return (
    <PageModal isOpen={isOpen}>
      <CloseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetFileList={onSetFileList}
        selectedFile={selectedFile}
        fileList={fileList}
      />
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
            {fileList.map((file) => (
              <div key={file} className={styles.picture}>
                <img src={file} alt="picture_cover" />
                <button
                  className={styles.pictureCloseBtn}
                  onClick={() => {
                    setSelectedFile(file);
                    setIsModalOpen(true);
                  }}
                >
                  <img src={closeWhiteIcon} alt="close_icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleRegisterPicture} className={styles.submitBtn}>
          등록
        </button>
      </div>
    </PageModal>
  );
}
