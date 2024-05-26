import PageModal from "../PageModal/PageModal";
import styles from "./UploadCoversPage.module.css";
import closeIcon from "../../assets/icons/close.svg";
import pictureIcon from "../../assets/icons/picture.svg";
import closeWhiteIcon from "../../assets/icons/close-white.svg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseModal from "../CloseModal/CloseModal";
import { FileListItem } from "../../pages/post/Post";
import { getPresignedUrl } from "../../api/image";
import axios from "axios";
import { useLocation } from "react-router-dom";

type UploadCoversPageProps = {
  isOpen: boolean;
  onClose: () => void;
  onSetFileList: Dispatch<SetStateAction<FileListItem[]>>;
  parentFileList: FileListItem[];
  onSetPresignedFileList: Dispatch<SetStateAction<string[]>>;
  existingFileList?: string[];
  setExistingFileList?: Dispatch<SetStateAction<string[]>>;
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
  onSetPresignedFileList,
  existingFileList = [],
  setExistingFileList,
}: UploadCoversPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<FileListItem[]>([]);
  const { pathname } = useLocation();

  // edit 페이지일 때 existing File List를 다루기 위함
  const [e_fileList, setE_fileList] = useState<string[]>([...existingFileList]);

  console.log("existingFileList:", existingFileList);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) {
      return;
    }
    const files = Array.from(e.target.files as FileList);

    if (e_fileList.length + e.target.files?.length + fileList.length > 4) {
      alert("사진은 최대 4장까지 가능합니다.");
    } else {
      files.forEach((file) => {
        setFileList((prevFileList) => [
          ...prevFileList,
          {
            file: file,
            name: file.name,
            url: URL.createObjectURL(file),
          },
        ]);
      });
    }
  };

  const handleCloseClick = () => {
    // existingFileList
    if (pathname === "/edit") {
      setE_fileList([...existingFileList]);
      setFileList([]);
    } else {
      setFileList([...parentFileList]);
    }
    onClose();
  };

  const handleRegistePicture = () => {
    onSetFileList([...fileList]);
    onSetPresignedFileList([]);
    if (pathname === "/edit") {
      setExistingFileList && setExistingFileList([...e_fileList]);
      setFileList([]);
    }

    setTimeout(() => {
      fileList.forEach(async (file) => {
        const data = await handleGetPresignedUrl(file.name);
        onSetPresignedFileList((prevList) => [
          ...prevList,
          `https://image.cnuyum.com/images/${data.fileName}`,
        ]);
        try {
          await axios.put(data.presignedUrl, file.file, {
            headers: {
              "Content-Type": "image/*",
            },
          });
        } catch (err: any) {
          console.log(err);
        }
      });
    }, 0);

    onClose();
  };

  useEffect(() => {
    setE_fileList(existingFileList);
  }, [existingFileList]);

  return (
    <PageModal isOpen={isOpen}>
      <CloseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClick={handleCloseClick}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>사진 첨부</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setIsModalOpen(true)}
          >
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
          accept="image/*"
          multiple
          onChange={handleFileSelected}
        />
        <div className={styles.pictureList}>
          <p>사진 첨부는 최대 4장까지 가능합니다.</p>
          <div className={styles.pictureArea}>
            {e_fileList.map((file) => (
              <div key={file} className={styles.picture}>
                <img src={file} alt="picture_cover" />
                <button
                  className={styles.pictureCloseBtn}
                  onClick={() => {
                    // setSelectedFile(file);
                    // setExistingFileList &&
                    //   setExistingFileList(
                    //     existingFileList.filter((target) => target !== file)
                    //   );

                    setE_fileList(
                      e_fileList.filter((target) => target !== file)
                    );
                  }}
                >
                  <img src={closeWhiteIcon} alt="close_icon" />
                </button>
              </div>
            ))}
            {fileList.map((file) => (
              <div key={file.name} className={styles.picture}>
                <img src={file.url} alt="picture_cover" />
                <button
                  className={styles.pictureCloseBtn}
                  onClick={() => {
                    // setSelectedFile(file);
                    setFileList(
                      fileList.filter(
                        (selectedFile) => file.name !== selectedFile.name
                      )
                    );
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
