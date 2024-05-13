import PageModal from "../PageModal/PageModal";
import styles from "./UploadCoversPage.module.css";
import closeIcon from "../../assets/icons/close.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import closeWhiteIcon from "../../assets/icons/close-white.svg";
import React, { Dispatch, SetStateAction, useState } from "react";
import CloseModal from "../CloseModal/CloseModal";
import { FileListItem } from "../../pages/post/Post";
import { getPresignedUrl } from "../../api/image";
import axios from "axios";

type UploadCoversPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onSetFileList: Dispatch<SetStateAction<FileListItem[]>>;
  parentFileList: FileListItem[];
  presignedFileList: string[];
  onSetPresignedFileList: Dispatch<SetStateAction<string[]>>;
};

const handleGetPresignedUrl = async (file: string) => {
  const data = await getPresignedUrl(file);
  return data;
};

export default function UploadCoversPage({
  isOpen,
  onClose,
  parentFileList,
  onSetFileList,
  presignedFileList,
  onSetPresignedFileList,
}: UploadCoversPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileListItem>(
    {} as FileListItem
  );
  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files as FileList);

    if (e.target.files?.length + fileList.length > 4) {
      alert("사진은 최대 4장까지 가능합니다.");
    } else {
      files.forEach((file) => {
        setFileList((prevFileList) => [
          ...prevFileList,
          {
            name: file.name,
            url: URL.createObjectURL(file),
          },
        ]);
      });
    }
  };

  const handleCloseClick = () => {
    setFileList([...parentFileList]);
    onClose();
  };

  const handleRegistePicture = () => {
    onSetFileList([...fileList]);
    onSetPresignedFileList([]);
    fileList.forEach(async (file) => {
      const data = await handleGetPresignedUrl(file.name);
      onSetPresignedFileList((prevList) => [...prevList, data.presignedUrl]);
      try {
        await axios.put(data.presignedUrl, file, {
          headers: {
            "Content-Type": "image/*",
          },
        });
      } catch (err: any) {
        console.log(err);
      }
    });

    onClose();
  };

  return (
    <PageModal isOpen={isOpen}>
      <CloseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetFileList={setFileList}
        selectedFile={selectedFile}
        fileList={fileList}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>사진 첨부</h2>
          <button className={styles.closeBtn} onClick={handleCloseClick}>
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
              <div key={file.name} className={styles.picture}>
                <img src={file.url} alt="picture_cover" />
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
        <button onClick={handleRegistePicture} className={styles.submitBtn}>
          등록
        </button>
      </div>
    </PageModal>
  );
}
