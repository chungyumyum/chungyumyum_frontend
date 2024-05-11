import controlIcon from "../../assets/icons/control.svg";
import styles from "./MainHeader.module.css";
import searchIcon from "../../assets/icons/search.svg";
import closeIcon from "../../assets/icons/close.svg";
import { useState } from "react";

const RECOMMENDED_PARAGRAPH = [
  "돈까스 맛집이 어디더라?",
  "돼지고기 맛집이 어디더라?",
  "국수 맛집이 어디더라?",
  "마라탕 맛집이 어디더라?",
];

export default function MainHeader() {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isDeemClicked, setIsDeemClicked] = useState(false);

  return (
    <>
      <div style={!isSidebarOpened ? { paddingTop: "7.9rem" } : {}}></div>
      <header
        style={isSidebarOpened ? { position: "initial" } : {}}
        className={styles.container}
      >
        <h1 className={styles.title}>충냠냠</h1>
        <div className={styles.searchContainer}>
          <input className={styles.search} type="text" />
          <img
            className={styles.searchIcon}
            src={searchIcon}
            alt="search_icon"
          />
          <div className={styles.recommendedParagraphContainer}>
            <div className={styles.test}>
              {RECOMMENDED_PARAGRAPH.map((data, i) => (
                <p className={styles.recommendedParagraph} key={data}>
                  {data}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button
            className={styles.controlBtn}
            onClick={() => {
              setIsDeemClicked(false);
              setIsSidebarOpened(true);
            }}
          >
            <img
              className={styles.controlIcon}
              src={controlIcon}
              alt="control_icon"
            />
          </button>
        </div>
      </header>
      {isSidebarOpened && (
        <>
          <div
            className={`${styles.deem} ${
              isDeemClicked && styles.deemDisappear
            }`}
            onClick={() => {
              setIsDeemClicked(true);
              setTimeout(() => {
                setIsSidebarOpened(false);
              }, 200);
            }}
          />
          <div
            className={`${styles.sidebar} ${
              isDeemClicked && styles.sidebarDisappear
            }`}
          >
            <div>
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setIsDeemClicked(true);
                  setTimeout(() => {
                    setIsSidebarOpened(false);
                  }, 200);
                }}
              >
                <img src={closeIcon} alt="close_icon" />
              </button>
              <div className={styles.sidebarContents}>
                <h3 className={styles.sidebarTitle}>동네 설정</h3>
                <ul className={styles.sidebarList}>
                  <li className={styles.sidebarListItem}>
                    <span>궁동</span>
                  </li>
                  <li className={styles.sidebarListItem}>
                    <span>봉명동</span>
                  </li>
                  <li className={styles.sidebarListItem}>
                    <span>어은동</span>
                  </li>
                  <li className={styles.sidebarListItem}>
                    <span>죽동</span>
                  </li>
                  <li className={styles.sidebarListItem}>
                    <span>장대동</span>
                  </li>
                </ul>

                <button className={styles.sidebarBtn}>완료</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
